import { body, query } from "express-validator";

export class AddressValidater{

    static addAddress(){
        return[
            body('title','Title is required').isString(),
            body('landmark','landmark is required').isString(),
            body('address','address is required').isString(),
            body('house','house is required').isString(),
            body('lat','lat is required').isNumeric(),
            body('lng','lng is required').isNumeric(),

        ]
    }

    static editAdress(){
        return[
            body('title','Title is required').isString(),
            body('landmark','landmark is required').isString(),
            body('address','address is required').isString(),
            body('house','house is required').isString(),
            body('lat','lat is required').isNumeric(),
            body('lng','lng is required').isNumeric(),

        ]
    }

    static checkAddress(){
        return[
              query('lat','lat is required').isNumeric(),
            query('lng','lng is required').isNumeric(),
        ]
    }
    static getlimitAdress(){
        return[
            query('limit','Address limit is required').isNumeric()
        ]
    }
}