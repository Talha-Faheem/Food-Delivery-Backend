import { NextFunction, Request, Response } from "express";
import Order from "../models/Ordermodel";
declare global {
  namespace Express {
    interface Request {
      user?: any;
      decoded?: any;
    }
  }
}

export class OrderController {
  static async placeOrder(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    const user_id = req.decoded.user_id;
    try {
      let orderData: any = {
        user_id,
        restaurant_id: data.restaurant_id,
        order: data.order,
        address: data.address,
        status: data.status,
        payment_status: data.payment_status,
        payment_method: data.payment_method,
        total: data.total,
        grandTotal: data.grandTotal,
        deliveryCharge: data.deliveryCharge,
      };
      if (data.instruction)
        orderData = { ...orderData, instruction: data.instruction };
      const order = await new Order(orderData).save();

      const response_order = {
        restaurant_id: order.restaurant_id,
        order: JSON.parse(order.order),
        address: order.address,
        instruction: order.instruction || null,
        status: order.status,
        payment_status: order.payment_status,
        payment_mode: order.payment_mode,
        total: order.total,
        grandTotal: order.grandTotal,
        deliveryCharges: order.deliveryCharge || 0,
        created_at: order.created_at,
        Updated_at: order.updated_at,
      };
      res.send(response_order);
    } catch (e) {
      next(e);
    }
  }

  static async getOrder(req: Request, res: Response, next: NextFunction) {
    const user_id = req.decoded.user_id;
    const perpage = 5;
    let num = req.query.page as string;
    const currentPage = parseInt(num) || 1;
    const prevPage = currentPage == 1 ? null : currentPage - 1;
    let nextpage = currentPage + 1;

    try {
      const order_doc_count = await Order.countDocuments({ user_id });
      const totalPages = Math.ceil(order_doc_count / perpage);
      if (totalPages == 0 || totalPages == currentPage) {
        nextpage = 0;
      }
      if (totalPages < currentPage) {
        throw "no more Address avaiable";
      }
      const orders = await Order.find({ user_id }, { user_id: 0, __v: 0 })
        .skip((perpage))
        .limit(perpage)
        .sort({ created_at: -1 })
        .populate("restaurant_id")
        .exec();

        res.json({
          orders,
          perpage,
          currentPage,
          prevPage,
          nextpage,
          totalPages
        })
      // res.send(orders);
    } catch (e) {
      next(e);
    }
  }
}
