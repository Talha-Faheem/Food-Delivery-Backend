import { Environment_dev } from "./environment.dev.ts";
import { Environment_pro } from "./environment.pro.ts";

export const environment=()=>{
    console.log(process.env.NODE_ENV)
    if(process.env.NODE_ENV==="production"){
        return Environment_pro
    }else{
        return Environment_dev
    }
}