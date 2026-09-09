import { NextFunction, Request, Response } from "express";
import User from "../models/userModels";
import { Nodemailer } from "../Utils/NodeMailer";
import { Utils } from "../Utils/Utils";

declare global {
  namespace Express {
    interface Request {
      user?: any;
      decoded?: any;
    }
  }
}

export class UserController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    const verfication_token = Utils.generation_verfication_token(6);
    // const error = validationResult(req);
    const email = req.body.email;
    const type = req.body.type;
    const status = req.body.status;
    const name = req.body.name;
    const phone = req.body.phone;

    // if (!error.isEmpty()) {
    //   res.status(400).json({ error: error.array() });
    // }

    // res.send(user);

    try {
      const hash = await Utils.encryptPassword(req.body.password);
      const user = {
        email,
        password: hash,
        phone,
        status,
        type,
        name,
        verfication_token,
        verfication_token_time: Date.now() + Utils.Max_token,
      };
      let users = await new User(user).save();

      const payload = {
        user_id: users._id,
        email: users.email,
        type:users.type
      };
      const token = Utils.JwtToken(payload,payload.user_id);
      const Refershtoken = Utils.JwtRefreshToken(payload,payload.user_id);

      res.json({
        token: token,
        Refershtoken,
        user: users,
      });
      await Nodemailer.sendMail({
        to: [email],
        subject: "test",
        html: `<h1>Your OTP is ${verfication_token}  </h1>`,
      });
    } catch (e) {
      next(e);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const password = req.query.password as string;
    const user = req.user;
    // res.send(req.user)
    // res.json(req.body)
    const data = {
      password: password,
      encrypt_password: user.password,
    };
    try {
      await Utils.comparePassword(data);
      const payload = {
        user_id: user._id,
        email: user.email,
        type:user.type
      };
        const token = Utils.JwtToken(payload,payload.user_id);
      const Refershtoken = Utils.JwtRefreshToken(payload,payload.user_id);

      res.json({
        token: token,
        Refershtoken,
        user: user,
      });
    } catch (e) {
      next(e);
    }
  }

  static async verify(req: Request, res: Response, next: NextFunction) {
    const verfication_token = req.body.verfication_token;
    const email = req.body.email;
    console.log(email);
    try {
      const users = await User.findOneAndUpdate(
        {
          email: email,
          verfication_token: verfication_token,
          verfication_token_time: { $gt: Date.now() },
        },
        {
          email_verified: true,
          updated_at: new Date(),
        },
        {
          returnDocument: "after",
        },
      );
      if (users) {
        res.send(users);
      } else {
        throw new Error(
          " Email verification Token Is Expiry. Please Try again",
        );
      }
    } catch (e) {
      next(e);
    }
  }

  static test2(req: Request, res: Response, next: NextFunction) {
    res.send(req.statusMessage);
  }

  static async resendVerificationEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    // res.send(req.decoded)
    const verification_token = await Utils.generation_verfication_token(5);
    const email = req.decoded.email as string;
    console.log(email);
    try {
      const user = await User.findOneAndUpdate(
        { email: email },
        {
          updated_at: new Date(),
          verfication_token: verification_token,
          verfication_token_time: Date.now()+ Utils.Max_token,
        },
        {
          new: true,
          runValidators: true,
        },
      );
      console.log("Updated user:", user);
      if (user) {
        await Nodemailer.sendMail({
          to: [req.decoded.email],
          subject: "resend",
          html: `<h1>Your OTP is ${verification_token}  </h1>`,
        });
        res.send(user);
      } else {
        throw new Error("Email aS Verification Token Is Expired.....");
      }
    } catch (e) {
      next(e);
    }
  }

  static async checkResetPasswordEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const email =req.query?.email as string ;
    const reset_password_token = Utils.generation_verfication_token();
    console.log(email)
    try {
      const user = await User.findOneAndUpdate(
        {
          email: email,
        },
        {
          updated_at: new Date(),
          reset_password_token_time: Date.now() + Utils.Max_token,
          reset_password_token: reset_password_token,
        },
      );
      if (user) {
        res.json({ success: true });

        await Nodemailer.sendMail({
          to: [user.email],
          subject: "Reset password email OTP",
          html: `<h1>Your OTP is ${reset_password_token}</h1>`,
        });
      }else{
        throw new Error('user not exist')
      }
    } catch (e) {
      next(e);
    }
  }

  static async verifyResetPasswordToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      res.json({
        success: true,
      });
    } catch (e) {
      next(e);
    }
  }

  static async resetpassword(req: Request, res: Response, next: NextFunction) {
    const user = req.user;
    const new_password = req.body.new_password;
    try {
      const encryptPassword = await Utils.encryptPassword(new_password);
      const updateuser = await User.findOneAndUpdate(
        {
          _id: user._id,
        },
        {
          updated_at: new Date(),
          password: encryptPassword,
        },
      );
      if (updateuser) {
        res.send(updateuser);
      } else {
        throw new Error("User does not exist");
      }
    } catch (e) {
      next(e);
    }
  }

  static async profile(req: Request, res: Response, next: NextFunction){
    const user=req.decoded
    try{
      const profile =await User.findById(user.user_id)
      if(profile){
        res.send(profile)
      }else{
        throw new Error('User doesnt exist')
      }
    }catch(e){
      next(e)
    }
  }
  static async updatePhonenumber(req: Request, res: Response, next: NextFunction){
    const user=req?.decoded;
    const phone =req.body.phone

    try{
      const userData=await User.findByIdAndUpdate(
        user.user_id,
        {phone :phone},
        {new:true}
      )
      res.send(userData)
    }catch(e){
      next(e)
    }


  }
  static async updateProfile(req: Request, res: Response, next: NextFunction){
    // console.log(req.body)
    const user=req.decoded
    const phone=req.body.phone
    const new_email=req.body.email
    const plain_password= req.body.password 
    const verfication_token=Utils.generation_verfication_token()
    try{
      const userData=await User.findById(
        user.user_id)|| {password:' '}
        const data={
          password:plain_password,
          encrypt_password:userData?.password,
        }
        await Utils.comparePassword(data)

        const updateUser=await User.findByIdAndUpdate(
          user.user_id,
          {
            phone:phone,
            email:new_email,
            email_verified:false,
            verfication_token,
            verfication_token_time:Date.now()+ Utils.Max_token
          },
          {new:true}
        )
        const payload={
          user_id:user.user_id,
          email:new_email,
          type:user.type
        }
        const token= await Utils.JwtToken(payload,payload.user_id)
        res.json({
          token:token,
          user:updateUser
        })

    }catch(e){
      next(e)
    }

  }

  static async getNewToken(req: Request, res: Response, next: NextFunction){
    const refreshToken=req.body.resfreshToken
    try{
      const decoded_data=await Utils.jwtRefreshverify(refreshToken)
      if(decoded_data){
        const payload={
          email:decoded_data.email,
          type:decoded_data.type
        }
        const access_token=Utils.JwtToken(payload,decoded_data.aud)
        const refresh_token=Utils.JwtRefreshToken(payload,decoded_data.aud)

        res.json({
          token:access_token,
          refreshToken:refresh_token,
        
        })
      }else{
        throw('Access is forbidden')
      }
    }catch(e){
      next(e)
    }
  }
}

//login

// const error=new Error('user email and password')
// next(error)
// res.status(422).json({
//     message:"email and passwor is not match"
//     ,error_status:422
// })

// res.send("hell")
// if(!email){
//     const error =new Error('email is required')
//     next(error)

// }else if(!password){
//     const error =new Error('password is required')
//     next(error)
// }
// user.save().then((user)=>{
//     res.send(user)
// }).catch(e=>next(e))
