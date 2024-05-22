const express = require('express')
const connectDB = require('./config/db')
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const userRoutes = require('./routes/userRoutes')
app.use('/api', userRoutes);

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
