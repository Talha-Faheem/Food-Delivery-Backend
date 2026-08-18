import { NextFunction, Request, Response } from "express";
import Category from "../models/CategoryModel";
declare global {
  namespace Express {
    interface Request {
      user?: any;
      decoded?: any;
    }
  }
}

export class CategoryController{

    static async getRestaurantCategories(req:Request,res:Response,next:NextFunction){
        // first test this then other and route change according to this
        // const path=req.file?.path
        // try{
        //   const categories=await Category.find({status:true})
        //   res.send(categories)
        // }catch(e){
        //   next(e)
        // }

        try{
            const restaurant_id=req.params.restaurantId;
            const categories=await Category.find({restaurant_id},{__v:0}).populate("restaurant_id")
            res.send(categories)
        }catch(e){
            next(e)
        }
    }

    
}