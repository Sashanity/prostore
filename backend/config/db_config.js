import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const connct = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log(`Connected to MongoDB: ${connct.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)

    }
}

export default connectDB