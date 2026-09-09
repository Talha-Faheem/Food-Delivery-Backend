import { body, query } from "express-validator";
import User from "../models/userModels";

export class Uservalidater {
  static signup() {
    return [
      body("name", "name is a required").isString(),
      body("password", "password is required").isString(),
      body("email", "email is required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({
            email: email,
          })
            .then((user) => {
              if (user) {
                throw new Error("user Already exist");
              } else {
                return true;
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
      body("status", "statusis required").isString(),
      body("type", "user role type is reqiured").isString(),
      body("phone", "user phone number is reqiured").isString(),
    ];
  }

  static login() {
    return [
      query("password", "password is required").isString(),
      query("email", "email is required??")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({
            email: email,
          })
            .then((user) => {
              if (user) {
                req.user = user;
                return true;
              } else {
                throw new Error("user not exist");
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
    ];
  }

  static verficationEmail() {
    return [
      body(
        "verfication_token",
        "Email verfication token is required",
      ).isNumeric(),
      body("email", "verfication eamilis required").isEmail(),
    ];
  }

  static verificationForResendEmail() {
    return [query("email", "Email is required").isEmail()];
  }

  static checkResetPasswordEmail() {
    return [
      query("email", "email is required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({
            email: email,
          })
            .then((user) => {
              if (user) {
                return true;
              } else {
                throw new Error("user not exist");
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
    ];
  }

  static verifyRestPasswordToken() {
    return [
      query("email", "Email is required ").isEmail(),
      query("reset_password_token", "Reset password token is required ").isNumeric()
        .custom((reset_password_token, { req }) => {
          return User.findOne({
            email:req?.query?.email,
            reset_password_token:reset_password_token,
            reset_password_token_time:{$gt:Date.now()}
          }).then(user=>
          {
            if(user){

                return true;
            }else{

                throw('no user Reguster with such Email')
            }
          }
          
          ).catch(e=>{
            throw new Error (e)
          }
          )
        }),
    ];
  }

  static resetPassword(){
    return[
        body('email','Emai is required ').isEmail()
        .custom((email,{req})=>{
            return User.findOne({
                email:email
            }).then(user=>{
               if(user){
                 req.user=user
                return true
               }else{
                throw(' no user register with this email')
               }

            }).catch(e=>{
                throw new Error(e)
            }),
            body('new_password','New Password is required').isAlphanumeric(),
            body('reset_password_token','Reset password token is required').isNumeric()
            .custom((reset_password_token,{req})=>{
                if(req.user.reset_password_token===reset_password_token)
                {
                    return true
                }
                else{
                    req.errorStatus=422
                    throw ('Reset password token is invalid ,please try again')
                }
            })

        })
    ]
  }


  static verifyphone()
  {
    return[
      body('phone','phone is required').isString()
    ]
  }
  static verifyUserprofile()
  {
    return[
        body('phone','Phone is required').isString(),
        body('email','Email is required').isEmail()
        .custom((email ,{req})=>{
          if(req.decoded.email===email) throw ('please provide a new email ')
          return User.findOne({
            email:email
          }).then(user=>{

            if(user){

              throw('no User Registered with such Email')
            }else{
              // req.user=user;
              return true
            }
          }).catch(e=>{
            throw new Error(e)
          })
        }),
        body('password','Password is required').isAlphanumeric(),

    ]
  }


  static checkRefreshToken(){
    return[
      body("refreshToken",'Refresh token is required').isString().custom((refreshToken,{req})=>{
        if(refreshToken){
          return true
        }else{
          throw('Access is forbidden')
        }
      })
    ]
  }
}
