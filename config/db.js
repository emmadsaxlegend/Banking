const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://bank:bank@clusterblog.gutze.mongodb.net/BANK?retryWrites=true&w=majority',
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false
            })
            
        console.log('Mongo Connected now');
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}


module.exports = connectDB