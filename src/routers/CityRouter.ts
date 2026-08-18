import { Router } from "express";
import { CitiesController } from "../controllers/citiesController";
import { GloabalMiddleware } from "../middleware/Gobalmiddleware";
import { CitiesValidater } from "../middleware/citiesValidater";

class CityRouter{
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
        this.router.get('/cities',CitiesController.getCities)
    }
    postRoute(){
        this.router.post('/cities',CitiesValidater.addCity(),GloabalMiddleware.checkError,CitiesController.addCity)
        
    }
    putRoute(){
        
    }
    patchRoute(){
        
    }
    deleteRoute(){
        
    }
    
}
export default new CityRouter().router