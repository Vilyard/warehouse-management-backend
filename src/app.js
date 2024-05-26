const express = require('express')
const connectDB = require('./config/db')
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3000

// Middleware to parse JSON
app.use(express.json());

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

const userRoutes = require('./routes/userRoutes')
const inventoryRoutes = require('./routes/inventoryRoutes')
const shipmentRoutes = require('./routes/shipmentRoutes')
const supplierRoutes = require('./routes/supplierRoutes')
const orderRoutes = require('./routes/orderRoutes')
const customerRoutes = require('./routes/customerRoutes')
const productRoutes = require('./routes/productRoutes')

app.use('/api', userRoutes)
app.use('/api', inventoryRoutes)
app.use('/api', shipmentRoutes)
app.use('/api', supplierRoutes)
app.use('/api', orderRoutes)
app.use('/api', customerRoutes)
app.use('/api', productRoutes)


// Start the server only after connecting to the database
const startServer = async () => {
  try {
    await connectDB()
    app.listen(port, () => {
      console.log(`App listening on port ${port}`)
    })
  } catch (error) {
    console.error('Failed to connect to the database:', error)
  }
}
startServer()
