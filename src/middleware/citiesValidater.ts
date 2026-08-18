import { body } from 'express-validator'

export class CitiesValidater{

    static addCity(){
        return[
            body('name','city name  is required').isString(),
            body('lat','city name  is required').isNumeric(),
            body('lng','city name  is required').isNumeric(),
            body('status','city name  is required').isString(),
        ]
    }
}