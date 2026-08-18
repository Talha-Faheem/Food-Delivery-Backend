import { Router } from "express";
import { RestaurantController } from "../controllers/RestaurantController";
import { GloabalMiddleware } from "../middleware/Gobalmiddleware";
import { RestaurantsValidater } from "../middleware/RestarurantValidater";
import { Utils } from "../Utils/Utils";
class RestaurantRouter{
    public router:Router

    constructor(){
        this.router=Router();
        this.getRoute()
        this.postRoute()
        this.putRoute()
        this.patchRoute()
        this.deleteRoute()
    }

    getRoute(){
        this.router.get('/restaurants',GloabalMiddleware.auth,RestaurantController.getRestaurant)
        this.router.get('/NearBy',GloabalMiddleware.auth,RestaurantsValidater.checkNearBy(),GloabalMiddleware.checkError,RestaurantController.nearbyRestaurant)
        this.router.get('/SearchBy',GloabalMiddleware.auth,RestaurantsValidater.searchNearBy(),GloabalMiddleware.checkError,RestaurantController.serachRestaurant)
    }
    postRoute(){
        this.router.post('/create',GloabalMiddleware.auth,GloabalMiddleware.adminRole,new Utils().multer.single('RestaurantImages'),RestaurantsValidater.addRestaurant(),GloabalMiddleware.checkError,RestaurantController.addRestaurant)
        
    }
    putRoute(){
        
    }
    patchRoute(){
        
    }
    deleteRoute(){
        
    }
    
}
export default new RestaurantRouter().router