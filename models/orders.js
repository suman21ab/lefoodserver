import mongoose from 'mongoose';

const ordersSchema = mongoose.Schema({
    mobile: String,
    seller: String,
    status: String,
    address: String,
    GPS: String,
    cart: [Object],
    createdAt: {
        type: Date,
        default: new Date(),
    },
    writecake: String,
    DeliveryDateTime: String,
    deliveryBoy: String
})



export default mongoose.model('AddOrders', ordersSchema);


