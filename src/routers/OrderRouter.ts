import { Router } from "express"
import { OrderController } from "../controllers/OrderController"
import { GloabalMiddleware } from "../middleware/Gobalmiddleware"
import { OrderValidater } from "../middleware/OrderValidater"
class OrderRouter{
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
        
    }
    postRoutes(){
        this.router.get('/placeorder',GloabalMiddleware.auth,OrderValidater.placeorder(),GloabalMiddleware.checkError,OrderController.placeOrder)
    }
    putRoutes(){
    }
    patchRoutes(){
    }
    deleteRoutes(){
    }
        

}

export default new OrderRouter().router