import { body } from "express-validator";
import Restaurant from "../models/RestaurantModel";
export class OrderValidater{

    static placeorder() {
        return[
            body('restaurant_id','Restaurant Id is required').isString()
            .custom((restaurant_id,{req})=>{
                return Restaurant.findById(restaurant_id).then(restaurant=>{
                    if(restaurant){
                        req.restaurant=restaurant
                        return true
                    }else{
                        throw('Restaurant doesnot exist')
                    }
                }).catch(e=>{
                    throw new Error(e)
                })
            }),
            body('order','order items is required').isString(),
            body('address','Address Id is required').isString(),
            body('status','Order status Id is required').isString(),
            body('Payment_status','Payment Id is required').isString(),
            body('payment_mode','payment_mode is required').isString(),
            body('total','Order Total is required').isString(),
            body('grandTotal','Grand Total is required').isString(),
            body('deliveryCharge','Delivery Charge is required').isString(),
        ]
    }
}