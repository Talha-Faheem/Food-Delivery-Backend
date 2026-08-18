import { NextFunction, Request, Response } from 'express';
import addressModel from "../models/addressModel";

export class AddressController{

    static async addAddress(req:Request,res:Response,next:NextFunction){
        const data=req.body
        try{
            const address=await new addressModel(data).save()
            res.send(address)
        }catch(e){
            next(e)
        }
    }
    
    
    static async getaddress(req:Request,res:Response,next:NextFunction){
        try{
            const address=await addressModel.find({})
            res.send(address)

        }catch(e){
            next(e)
        }
    }
}