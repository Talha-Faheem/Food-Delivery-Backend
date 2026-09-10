import { createClient } from "redis";

export class Redis{
    private client =createClient({
        url:'redis://Talha:Redis@11@colorful-fly-volleyball-13013.db.redis.io:19106',
        username:'Talha',
        password:'Redis@11'
    })

     static connectToRedis(){
        new Redis().client.connect().then(()=>{
            console.log('connected with redis')
        })
        
    }

    static async setvalue(key:string,value:string,expire_at:number){
        let options:any={}
        if(expire_at)
        {
            options={
                Ex:expire_at
            }
        }
        await new Redis().client.set(key,value,options)
    }

    static async getvalue(key:string,value:string,expire_at:number){
        return await new Redis().client.get(key)
    }
    static async delvalue(key:string){
        await new Redis().client.del(key)
    }
}