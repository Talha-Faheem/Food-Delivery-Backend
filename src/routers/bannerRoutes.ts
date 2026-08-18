import { Router } from "express"
import { bannerController } from "../controllers/bannerController"
import { bannerValidater } from "../middleware/bannerValidater"
import { GloabalMiddleware } from "../middleware/Gobalmiddleware"
import { Utils } from "../Utils/Utils"
class bannerRoute{
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
        this.router.get('banner',GloabalMiddleware.auth,bannerController.getBanner)
    }
    postRoutes(){
        this.router.post('/add/banner',GloabalMiddleware.auth,GloabalMiddleware.adminRole,new Utils().multer.single('bannerImages'),bannerValidater.addbanner(),bannerController.addbanner)
    }
    putRoutes(){
    }
    patchRoutes(){
    }
    deleteRoutes(){
    }
        

}

export default new bannerRoute().router