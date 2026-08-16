const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected')
    } catch (error) {
        console.error('MongoDB connection failed:', error.message)
        console.log('Retrying MongoDB connection in 10 seconds...')

        setTimeout(connectDB, 10000)
    }
}

module.exports = connectDB