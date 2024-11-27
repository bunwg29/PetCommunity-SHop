import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userInfo: {
      name: String,
      email: String,
      phone: String,
      address: String,
    },
    products: [
      {
        avt: String,
        name: String,
        size: Number,
        unit: String,
        productId: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalPrice: Number,
    status: {
      type: String,
      default: 'Confirming',
    },
  },
  {
    timestamps: true,
  }
);

const FoodOrderModel = mongoose.model(
  'FoodOrderModel',
  orderSchema,
  'food_orders'
);

export default FoodOrderModel;