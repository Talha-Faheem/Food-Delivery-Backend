import { NextFunction, Request, Response } from 'express';
import City from '../models/CityModel';

export class CitiesController{

    static async addCity (req:Request,res:Response,next:NextFunction){
        const name=req.body.name
        const lat=req.body.lat
        const lng=req.body.lng
        const status=req.body.status

        try{
            const data={
                name,
                lat,
                lng,
                status
            }
            const banner=await new City(data).save()
            res.send(banner)

        }catch(e){
            next(e)
        }
    }

    static async getCities(req:Request,res:Response,next:NextFunction){
        try{
            const cities=await City.find({status:'active'})
            res.send(cities)
        }catch(e){
            next(e)
        }
    }
}