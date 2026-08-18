import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { Utils } from "../Utils/Utils";

export class GloabalMiddleware{

    static checkError(req:Request,res:Response,next:NextFunction){
        const error=validationResult(req);
        if(!error.isEmpty())
        {
            next(new Error(error.array()[0].msg))
        }else{
            next()
        }
    }

    static async auth(req:Request,res:Response,next:NextFunction){
       const header_auth= req.headers.authorization
        const token=header_auth? header_auth.slice(7,header_auth.length):'' as string
        // console.log(token)
        try{
            
            if(!token)next(new Error('User doesn\'t exist'))
            const decoded=await Utils.jwtverify(token)
            req.decoded=decoded
            
            next()
        }catch(e)
        {
            next(e)
        }
    
    }

    static async adminRole(req:Request,res:Response,next:NextFunction){
        const user=req.user;
        if(user.type!=='admin'){
           next(new Error('you are an Unauthorised User'))
        }
        next()
    }
}