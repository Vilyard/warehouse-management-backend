const mongoose = require('mongoose')

const shipmentSchema = mongoose.Schema({
    shipmentNumber:{
        type: String,
        unique: true,
        required: true,
    },
    orderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Order",
        required: true,
    },
    carrier:{
        type: String,
        required: true,
    },
    trackingNumber:{
        type: String,
        unique: true,
        required: true,
    },
    status:{
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancled'],
        required: true,
    },
    shippedAt:{
        type: Date,
    },
    deliveredAt:{
        type: Date,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
})

const Shipment = mongoose.model('Shipment', shipmentSchema)

module.exports = Shipment