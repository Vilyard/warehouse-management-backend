const mongoose = require("mongoose")

const supplierSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contactName: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  suppliedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
}],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

const Supplier = mongoose.model("Supplier", supplierSchema)

module.exports = Supplier
