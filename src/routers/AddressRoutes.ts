import { Router } from "express"
import { CategoryController } from "../controllers/CategoryController"
import { GloabalMiddleware } from "../middleware/Gobalmiddleware"
class addressRoute{
public router:Router


    constructor(){
        this.router=Router()
        this.getRoutes()
        this.postRoutes()
        this.putRoutes()
        this.patchRoutes()
        this.deleteRoutes()
    }

    getRoutes(){
        this.router.get('/address',GloabalMiddleware.auth,CategoryController.getRestaurantCategories)
    }
    postRoutes(){
       
    }
    putRoutes(){
    }
    patchRoutes(){
    }
    deleteRoutes(){
    }
        

}

export default new addressRoute().router