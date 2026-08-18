import { Router } from "express";
import { itemController } from "../controllers/itemsControoler";
import { GloabalMiddleware } from "../middleware/Gobalmiddleware";
import { itemsValidater } from "../middleware/itemsValidators";
import { Utils } from "../Utils/Utils";
class itemRouter{
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
        this.router.get('/items/:restaurantId',GloabalMiddleware.auth,itemsValidater.getitem,GloabalMiddleware.checkError,itemController.getMenu)
    }
    postRoute(){
        this.router.post('/additem',GloabalMiddleware.auth,GloabalMiddleware.adminRole,new Utils().multer.single("itemImage"),itemsValidater.addItem(),GloabalMiddleware.checkError,itemController.addItem)
        
    }
    putRoute(){
        
    }
    patchRoute(){
        
    }
    deleteRoute(){
        
    }
    
}
export default new itemRouter().router