import { body, param } from "express-validator";
import CategoryModel from "../models/CategoryModel";
import Restaurant from "../models/RestaurantModel";
export class itemsValidater {
  static addItem() {
    return [
    body('name','City is required').isString(),
    body('restaurant_id','Resturant id is required').isString()
    .custom((restaurant_id,{req})=>{
      return Restaurant.findById(restaurant_id).then(restaurant=>{

        if(restaurant){
          return true
        }else {
          throw('Restaurant doesnt exist')
        }
      }).catch(e=>{
        throw new Error(e)
      })
    }),
    body('category_id','Category id is required').isString()
    .custom((category_id,{req})=>{
      return CategoryModel.findOne({_id:category_id,restaurant_id:req.body.restaurant_id }).then(category=>{
        if(category){
          return true
        }else {
          throw('Category doesnot exist')
        }
      }).catch(e=>{
        throw new Error(e)
      })
    }),
    body('price','Price is required').isNumeric(),
    body('status','status is required').isBoolean(),
    body('itemImage','image is required').custom((cover,{req})=>{
      if(req.file){
        return true
      }else{
        throw('File not uploaded')
      }
    }),
    ]
  }


  static async getitem(){
    return[
      param("restaurantId","Restaurant Id is required").isString()
      .custom((restaurantId,{req})=>{
        return Restaurant.findById(restaurantId).then(restaurant=>{
          if(restaurant){
            req.restaurant=restaurant
            return true
          }else{
            throw("REstaurant doesnot exist")
          }
        }).catch(e=>
        {
          throw new Error(e)
        }
        )
      })
    ]
  }
}
