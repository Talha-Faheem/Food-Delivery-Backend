import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Multer from "multer";

const destinationOptions = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads/"+file.filename);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + file.originalname); //file.mimetype
  },
});


export class Utils {
  static Max_token = 5 * 60 * 1000;

  public multer = Multer({
    storage: destinationOptions,
    fileFilter(req, file, callback) {
      if (file.mimetype === "images/jpeg" || file.mimetype === "image/png") {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
  });

  static generation_verfication_token(digits: Number = 4) {
    let code = "";
    let number = "1234567890";

    for (let i: any = 0; i < digits; i++) {
      const random = Math.floor(Math.random() * 10);
      code += number[random];
    }
    return parseInt(code);
  }

  static encryptPassword(password: string) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  }

  static comparePassword(data: { password: string; encrypt_password: string }) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(data.password, data.encrypt_password, (err, same) => {
        if (err) {
          reject(err);
        } else if (!same) {
          reject(new Error("User and password not match"));
        } else {
          resolve(true);
        }
      });
    });
  }

  static JwtToken(payload: object) {
    return jwt.sign(payload, "sercet key", { expiresIn: "180d" ,issuer:'helloG'});
  }

  static jwtverify(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, "sercet key", (err, decoded) => {
        console.log(decoded)
        if (err) reject(err);
        else if(!decoded) {reject(new Error("user is not authorized"));
        }
        else resolve(decoded);
      });
    });
  }
}
