import { NextFunction, Request, Response } from "express";
import Banner from "../models/bannerModel";
import Category from "../models/CategoryModel";
import Restaurant from "../models/RestaurantModel";
import User from "../models/userModels";
import { Utils } from "../Utils/Utils";

export class RestaurantController {
  static async addRestaurant(req: Request, res: Response, next: NextFunction) {
    const restaurant = req.body;
    const path = req?.file?.path;
    const verfication_token = Utils.generation_verfication_token();

    try {
      const hash = await Utils.encryptPassword(restaurant.password);
      const data = {
        email: restaurant.email,
        verfication_token_time: Date.now() + Utils.Max_token,
        verfication_token,
        phone: restaurant.phone,
        password: restaurant.password,
        name: restaurant.name,
        type: "restaurant",
        status: "active",
        // email:restaurant.email,
      };
      const user = await new User(data).save();
      //   const category = Categ;
      // res.send(banner)
      // create categories
      const categoriesData = JSON.stringify(
        restaurant.categories.map((x: any) => {
          return { name: x, user_id: user?._id };
        }),
      );

      const categories = await Category.insertMany(categoriesData);

      // create restaurant
      let restaurant_data: any = {
        name: restaurant.res_name,
        short_name: restaurant.short_name,
        location: restaurant.location,
        address: restaurant.address,
        openTime: restaurant.openTime,
        closeTime: restaurant.closeTime,
        status: restaurant.status,
        cuisines: JSON.parse(restaurant.cuisines),
        price: parseInt(restaurant.price),
        delivery_time: parseInt(restaurant.delivery_time),
        city_id: restaurant.city_id,
        user_id: user._id,
        // description:restaurant.description || ' '
      };
      if (restaurant.description)
        restaurant_data = {
          ...restaurant_data,
          description: restaurant.description,
        };
      if (req.file) {
        // const path = req.file.path;
        restaurant_data = { ...restaurant_data, cover: path };
        // restaurant_data={...restaurant_data,cover:restaurant.cover}
      }

      const restaurantDoc = await new Restaurant(data).save();

      res.send(restaurantDoc);
    } catch (e) {
      next(e);
    }
  }
  static async getRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
      const cities = await Category.find({ status: true });
      res.send(cities);
    } catch (e) {
      next(e);
    }
  }

  static async nearByRestaurantpages(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    // try {
    //   const cities = await Category.find({ status: "active" });
    //   res.send(cities);
    // } catch (e) {
    //   next(e);
    // }
    const EARTH_RADIUS_IN_KM = 6378.1;
    const data: any = req.query;
    const perpage: any = 10;
    const pagenum = req.query.page as string;
    const currentPage = parseInt(pagenum) || 1;
    const prevPage = currentPage === 1 ? null : currentPage - 1;
    let nextPage = currentPage + 1;
    // const METER_PER_KM=1000

    try {
    
      const res_doc_count = await Restaurant.countDocuments({
        status: "active",
        name:{$regex: data.name,$options:'$i'},
        location: {
          // $nearSphere:{
          //   $geometery:{
          //     type:'Point',
          //     coordinates:[parseFloat(data.lng),parseFloat(data.lat)]
          //   },
          // $maxDistance:parseFloat(radius)*METER_PER_KM
          // }
          $geoWithin: {
            $centerSphere: [
              [parseFloat(data.lng), parseFloat(data.lat)],
              parseFloat(data.radius) / EARTH_RADIUS_IN_KM,
            ],
          },
        },
      })
        .skip(currentPage * perpage - perpage)
        .limit(perpage);

      
          const totalPages = Math.ceil(res_doc_count / perpage);
      if (totalPages == 0 || totalPages == currentPage) {
        nextPage == 0;
      }
      if (totalPages < currentPage) {
        throw "no more Order avaiable";
      }
      // const banners=await Banner.find({status:true})
      res.json({
        res_doc_count,
        perpage,
        currentPage,
        prevPage,
        nextPage,
        totalPages,
      });
    } catch (e) {
      next(e);
    }
  }
  static async nearbyRestaurant(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    // try {
    //   const cities = await Category.find({ status: "active" });
    //   res.send(cities);
    // } catch (e) {
    //   next(e);
    // }

    const data: any = req.query;
    const radius: any = req.query.radius;
    // const METER_PER_KM=1000

    try {
      const restaurant = await Restaurant.find({
        status: "active",
        location: {
          // $nearSphere:{
          //   $geometery:{
          //     type:'Point',
          //     coordinates:[parseFloat(data.lng),parseFloat(data.lat)]
          //   },
          // $maxDistance:parseFloat(radius)*METER_PER_KM
          // }
          $geoWithin: {
            $centerSphere: [
              [parseFloat(data.lng), parseFloat(data.lat)],
              parseFloat(radius) / 1.6 / 3963.2,
            ],
          },
        },
      });
      const banners = await Banner.find({ status: true });
      res.json({
        banners,
        restaurant,
      });
    } catch (e) {
      next(e);
    }
  }
  static async serachRestaurant(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const data: any = req.query;
    const radius: any = req.query.radius;
    // const METER_PER_KM=1000

    try {
      const restaurant = await Restaurant.find({
        status: "active",
        name: { $regex: data.name, $options: "i" },

        location: {
          // $nearSphere:{
          //   $geometery:{
          //     type:'Point',
          //     coordinates:[parseFloat(data.lng),parseFloat(data.lat)]
          //   },
          // $maxDistance:parseFloat(radius)*METER_PER_KM
          // }
          $geoWithin: {
            $centerSphere: [
              [parseFloat(data.lng), parseFloat(data.lat)],
              parseFloat(radius) / 1.6 / 3963.2,
            ],
          },
        },
      });
      const banners = await Banner.find({ status: true });
      res.json({
        banners,
        restaurant,
      });
    } catch (e) {
      next(e);
    }
  }
}
