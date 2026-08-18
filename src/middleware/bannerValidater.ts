import { body } from "express-validator";

export class bannerValidater{

    static addbanner() {
        return[
            body('bannerImages ','Banner image is reqiured ').custom((banner,{req})=>{
                if(req.file){
                    return true
                }else{
                    throw('File not uploaded')
                }
            })
        ]
    }
}