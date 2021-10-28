const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/Quizz', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Connect Successfully!")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {connect}
