import { NextFunction, Request, Response } from 'express';
import Address from '../models/addressModel';
export class AddressController{

    static async addAddress (req:Request,res:Response,next:NextFunction){
        const data=req.body
        const user_id=req.decoded.aud

        try{
            const addressdata={

                user_id,
                title:data.title,
                address:data.address,
                landmark:data.landmark,
                house:data.house,
                lat:data.lat,
                lng:data.lng
            }
            const address=await new Address(addressdata).save()
            res.send(address)

        }catch(e){
            next(e)
        }
    }

    static async getUserAddress(req:Request,res:Response,next:NextFunction){
        const user_id=req.decoded.user_id
        const perpage =5
        let num=req.query.page as string
        const currentPage=parseInt(num) || 1 ; 
        const prevPage= currentPage==1?null:currentPage-1
        let nextpage=currentPage+1
        try{
            const address_doc_count=await Address.countDocuments({user_id})
            const totalPages=Math.ceil(address_doc_count/perpage)
            if(totalPages==0 || totalPages==currentPage){
                nextpage=0
            }
            if(totalPages<currentPage){
                throw('no more Address avaiable')
            }
            const address=await Address.find({user_id},{user_id:0,__v:0}).skip((currentPage*perpage)-perpage).limit(perpage)
            res.json({
                address,
                perpage,
                currentPage,
                prevPage,
                nextpage,
                totalPages
            })
        }catch(e){
            next(e)
        }
    }
    static async getAddress(req:Request,res:Response,next:NextFunction){
        const user_id=req.decoded.user_id
        try{
            const address=await Address.find({user_id})
            res.send(address)
        }catch(e){
            next(e)
        }
    }

    static async deleteAddress(req:Request,res:Response,next:NextFunction){
        const user_id=req.decoded.user_id
        const id=req.params.id
        try{
            await Address.findOneAndDelete({
                user_id:user_id,
                _id:id
            })
            res.json({success:true})
        }catch(e){
            next(e)
        }

    }

    static async getAddressById(req:Request,res:Response,next:NextFunction){
        const user_id=req.decoded.user_id
        const id=req.params.id
        try{
            const address=await Address.findOne(
                {
                    user_id:user_id,
                    _id:id
                },{
                    user_id:0,
                    __v:0
                }
            )
            res.send(address)
        }catch(e){
            next(e)
        }
    }

    static async editAddress(req:Request,res:Response,next:NextFunction){
        const user_id=req.decoded.user_id
        const id=req.params.id
        const data=req.body
        try{
            const address=await Address.findOneAndUpdate(
                {
                    user_id,
                    _id:id
                },
                {
                    title:data.title,
                address:data.address,
                landmark:data.landmark,
                house:data.house,
                lat:data.lat,
                lng:data.lng
                }
                ,{
                    new:true,
                    projection:{user_id:0,__v:0}
                }
            )
            if(address){
                res.send(address)
            }else{
                throw('Address doesnot exist')
            }
        }catch(e){
            next(e)
        }
    }

    static async checkAddress(req:Request,res:Response,next:NextFunction){
        const user_id=req.decoded.user_id
        const data=req.body
        try{
            const address=await Address.findOne(
                {
                    user_id,lat:data.lat,lng:data.lng
                },{
                    user_id:0,__v:0
                }
            )
            res.send(address)
        }catch(e){
            next(e)
        }
    }

    static async getlimitAddress(req:Request,res:Response,next:NextFunction){
        const user_id=req.decoded.user_id;
        const limit =req.query.limit
        try{
            const addresses=await Address.find({user_id},{user_id:0,__v:0})
            res.send(addresses)
        }catch(e){
            next(e)
        }
    }
}