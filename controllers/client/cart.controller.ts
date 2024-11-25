import { Request, Response } from "express";
import CartModel from "../../models/cart.model";
import FoodPetModel from "../../models/foodPet.model";

export const index = async (req: Request, res: Response) => {

    const cartId = req.cookies.cartId;

    const cart = await CartModel.findOne({
        _id: cartId
    });

    cart.totalPrice = 0;
    
    if (cart.products.length > 0) {

        for (const product of cart.products) {
            const productInfo = await FoodPetModel.findOne({
                _id: product.product_id
            }).select("name size unit price avt");

            product.productInfo = {
                name: productInfo.name,
                size: productInfo.size,
                unit: productInfo.unit,
                price: product.quantity * productInfo.price,
                avt: productInfo.avt,
            };

            cart.totalPrice += product.productInfo.price;
        };
    }
    
    res.render("client/pages/cart/index", {
        title: "My Cart",
        cart
    });

};

export const reduceItem = async (req: Request, res: Response) => {

    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const quantity = parseInt(req.params.quantity);

    try {
        const cart = await CartModel.updateOne(
            {
                _id: cartId,
                'products.product_id': productId
            },
            {
                $set: {
                    'products.$.quantity': quantity - 1
                }
            }
        );
    
        if (cart) {
            req.flash("success", "Update quantity of product successfully");
            res.redirect("back");
        }

    } catch (error) {
        req.flash("error", "Update failed");
    }


};

export const addItem = async (req: Request, res: Response) => {

    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const quantity = parseInt(req.params.quantity);

    try {
        const cart = await CartModel.updateOne(
            {
                _id: cartId,
                'products.product_id': productId
            },
            {
                $set: {
                    'products.$.quantity': quantity + 1
                }
            }
        );
    
        if (cart) {
            res.redirect("back");
            req.flash("success", "Update quantity of product successfully");
        }

    } catch (error) {
        req.flash("error", "Update failed");
    }
    
    
};

export const deleteProduct = async (req: Request, res: Response) => {

    const cartId = req.cookies.cartId;
    const productId = req.params.productId;

    try {
        const cart = await CartModel.updateOne(
            {_id: cartId }, 
            {
                $pull: { products: { product_id: productId } }
            }
        );
    
        if (cart) {
            res.redirect("back");
            req.flash("success", "Delete product in cart successfully");
        }

    } catch (error) {
        req.flash("error", "Update failed");
    }
    
};