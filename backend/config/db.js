const mongoose = require('mongoose');
require('dotenv').config();

module.exports = connect = async () =>{
    try {
        const response = await mongoose.connect(process.env.URL,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useFindAndModify:false
        });
        console.log("MONGODB CONNECTED SUCCESSFULLY");
    } catch (error) {
        console.log("MONGODB ERROR OCCURED", error);
    }
}