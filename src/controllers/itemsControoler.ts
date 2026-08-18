import { NextFunction, Request, Response } from "express";
import CategoryModel from "../models/CategoryModel";
import itemsModel from "../models/itemsModel";
declare global {
  namespace Express {
    interface Request {
      user?: any;
      decoded?: any;
      restaurant:any;
    }
  }
}

export class itemController {
  static async addItem(req: Request, res: Response, next: NextFunction) {
    const itemData = req.body;
    const path = req?.file?.path;
    try {
      let item_data: any = {
        name: itemData.name,
        status: itemData.status,
        price: itemData.price,
        category_id: itemData.category_id,
        restaurant_id: itemData.restaurant_id,
        cover: path,
      };
      if (itemData.description)
        item_data = { ...item_data, description: itemData.description };
      const itemDoc = await new itemsModel(item_data).save();
      res.send(itemDoc);
    } catch (e) {
      next(e);
    }
  }

  static async getMenu(req: Request, res: Response, next: NextFunction) {
    const restaurant = req?.restaurant ;

    try {
      const categories = await CategoryModel.find(
        { restaurant_id: restaurant._id },
        { __v: 0 },
      );
      const items = await itemsModel.find({
        // status: true,
        restaurant_id: restaurant._id,
      });

      res.json({
        restaurant,
        categories,
        items,
      });
    } catch (e) {
      next(e);
    }
  }
}
