import { NextFunction, Request, Response } from "express";
import bannerModel from "../models/bannerModel";
declare global {
  namespace Express {
    interface Request {
      user?: any;
      decoded?: any;
    }
  }
}

export class bannerController{

    static async addbanner(req:Request,res:Response,next:NextFunction){
        const path=req.file?.path
        try{
          const data={
            banner:path
          }
          const banner=await new bannerModel(data).save()
          res.send(banner)
        }catch(e){
          next(e)
        }
    }

    static async getBanner(req:Request,res:Response,next:NextFunction){
      try{
        const banners=await bannerModel.find({})
        res.send(banners)
      }catch(e){
        next(e)
      }
    }
}