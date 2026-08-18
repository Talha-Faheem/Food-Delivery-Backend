import { Router } from "express"
import { UserController } from "../controllers/userController.ts"
import { GloabalMiddleware } from "../middleware/Gobalmiddleware.ts"
import { Uservalidater } from "../middleware/UserValidater.ts"
class UserRoute{
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
    this.router.get('/send/verification/email',GloabalMiddleware.auth,UserController.resendVerificationEmail)
    this.router.get('/login',Uservalidater.login(),GloabalMiddleware.checkError,UserController.login)
    this.router.get('/reset/password',Uservalidater.checkResetPasswordEmail(),GloabalMiddleware.checkError,UserController.checkResetPasswordEmail)
    this.router.get('/reset/password/verify',Uservalidater.verifyRestPasswordToken(),GloabalMiddleware.checkError,UserController.verifyResetPasswordToken)
    this.router.get('/profile',GloabalMiddleware.auth,UserController.profile)
}
postRoutes(){
    this.router.post("/signup",Uservalidater.signup(),GloabalMiddleware.checkError,UserController.signup)

}
putRoutes(){}
patchRoutes(){
        this.router.patch("/verify",Uservalidater.verficationEmail(),GloabalMiddleware.checkError,UserController.verify)
        this.router.patch("/reset/password",GloabalMiddleware.auth,Uservalidater.resetPassword(),GloabalMiddleware.checkError,UserController.resetpassword)
        this.router.patch("/changephone",GloabalMiddleware.auth,Uservalidater.verifyphone(),GloabalMiddleware.checkError,UserController.updatePhonenumber)
        this.router.patch("/changeProfile",GloabalMiddleware.auth,Uservalidater.verifyUserprofile(),GloabalMiddleware.checkError,UserController.updateProfile)

    }
    deleteRoutes(){}
}
export default new UserRoute().router