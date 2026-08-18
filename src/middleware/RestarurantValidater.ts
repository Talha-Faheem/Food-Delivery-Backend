import { body, query } from "express-validator";
import User from "../models/userModels";
export class RestaurantsValidater {
  static addRestaurant() {
    return [
      body("name", "Owner Name is required").isString(),

      body("email", "Email is required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({
            email: email,
            // type: "user"
          })
            .then((user) => {
              if (user) {
                // throw new Error('User Already Exists');
                throw "User Already Exists";
              } else {
                return true;
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),

      body("phone", "Phone number is required").isString(),

      body("password", "Password is required")
        .isAlphanumeric()
        .isLength({ min: 8, max: 20 })
        .withMessage("Password must be between 8-20 characters"),

      body("res_name", "Restaurant Name is required").isString(),
      body("restaurantImages", "cover image is required").custom((cover,{req})=>{
        if(req.file){
          return true;

        }else {
          throw('File not uploaded')
        }
      }),
      body("short_name", "Restaurant Short Name is required").isString(),
      body("openTime", "Opening time is required").isString(),
      body("closeTime", "Closing time is required").isString(),
      body("price", "Price is required").isNumeric(),
      body("delivery_time", "Delivery time is required").isNumeric(),
      body("status", "Status is required").isString(),
      body("address", "Address is required").isString(),
      body("location", "Location is required").isObject(),
      body("cuisines", "Cuisines is required").isArray(),
      body("city_id", "City is required").isString(),
    ];
  }

  static checkNearBy()
  {
    return[
      query('lat',"lat is required").isNumeric(),
      query('lng',"lng is required").isNumeric(),
      query('radius','Raduis is required').isNumeric()
    ]
  }
  static searchNearBy()
  {
    return[
      query('lat',"lat is required").isNumeric(),
      query('lng',"lng is required").isNumeric(),
      query('radius','Raduis is required').isNumeric(),
      query('name','Resturant name is required').isString()
    ]
  }
}
