import { Router } from "express";
import { AddressController } from "../controllers/AddressController";
import { AddressValidater } from "../middleware/AddressValidater";
import { GloabalMiddleware } from "../middleware/Gobalmiddleware";
class AddressRouter{
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
        this.router.get('/address',GloabalMiddleware.auth,AddressController.getAddress)
        this.router.get('/CheckAddress',GloabalMiddleware.auth,AddressValidater.checkAddress(),GloabalMiddleware.checkError,AddressController.checkAddress)
        this.router.get('/getlimitAddress',GloabalMiddleware.auth,AddressValidater.getlimitAdress(),GloabalMiddleware.checkError,AddressController.getlimitAddress)
        this.router.get('/:id',GloabalMiddleware.auth,GloabalMiddleware.checkError,AddressController.getAddressById)
    }
    postRoute(){
        this.router.post("/create",GloabalMiddleware.auth,AddressValidater.addAddress(),GloabalMiddleware.checkError,AddressController.addAddress)

    }
    patchRoute(){
        this.router.patch('/edit/:id',GloabalMiddleware.auth,AddressValidater.editAdress(),GloabalMiddleware.checkError,AddressController.editAddress)
    }
    putRoute(){
        
    }
    deleteRoute(){
        this.router.delete('/delete/:id',GloabalMiddleware.auth ,AddressController.deleteAddress)
    }
    
}
export default new AddressRouter().router