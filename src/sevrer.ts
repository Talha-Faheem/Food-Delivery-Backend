import bodyParser from "body-parser";
import cors from 'cors';
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { environment } from "./environment/environment.ts";
import bannerRoutes from "./routers/bannerRoutes.ts";
import CityRouter from "./routers/CityRouter.ts";
import RestaurantRouter from "./routers/RestaurnatRoutes.ts";
import UserRoute from "./routers/UserRoute.ts";
// import { CategoryRouter } from "./controllers/CategoryController.ts";
import dotenv from 'dotenv';
import AdddressRoutes from "./routers/AdddressRoutes.ts";
import CategoryRouter from "./routers/CategoryRouter.ts";
import itemRoutes from "./routers/itemRoutes.ts";
import OrderRouter from "./routers/OrderRouter.ts";
export class Server {
  public app: express.Application = express();

  constructor() {
    this.setConfig();
    this.setRoute();
    this.handle404();
    this.handleErrors()
  }

  setConfig() {
   this.configmongo()
   this.configParser()
   this.configCors()
  }

  
  configCors(){
    this.app.use(cors())
  }


  configmongo(){
     mongoose.connect(environment().db_url).then(() => {
      console.log("database is connected");
    });
  }

  dotenvConfigs(){
    dotenv.config({path:'env'})
  }

  configParser(){
    this.app.use(express.urlencoded({
      extended:true
    }))
    this.app.use(bodyParser.urlencoded({extended:true}))
    // this.app.use(express.json())
  }
  setRoute() {
    this.app.use('/src/uploads',express.static('src/uploads'))
    this.app.use("/api/user", UserRoute); 
    this.app.use("/api/banner", bannerRoutes); 
    this.app.use("/api/city", CityRouter); 
    this.app.use("/api/restaurant", RestaurantRouter); 
    this.app.use("/api/category", CategoryRouter); 
    this.app.use("/api/items", itemRoutes); 
    this.app.use("/api/address", AdddressRoutes); 
    this.app.use("/api/order", OrderRouter); 
  }

  handle404(){
    this.app.use((req,res)=>{
      res.status(404).json({
        message:"not found",
        status_code:404
      })
    })
  }
  handleErrors() {
    this.app.use((error: any,
      req: Request,
      res: Response,
      next: NextFunction
      
    ) => {
      // next()
      const errorStatus = req.statusCode || 500;
      res.status(errorStatus).json({
        message: error.message || "something",
        status_code: errorStatus,
      })
    })
  }
}
