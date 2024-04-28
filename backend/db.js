const mongoose = require('mongoose');

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb+srv://abhayaswal99:y4EpMXggRVoU9z13@clusterpaytm.maxzdeb.mongodb.net/paytm');

//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }
mongoose.connect("mongodb+srv://abhayaswal99:y4EpMXggRVoU9z13@clusterpaytm.maxzdeb.mongodb.net/paytm")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema= new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    balance:{
        type: Number,
        required: true
    }
})


const Account = mongoose.model("Account", accountSchema)
const User = mongoose.model("User", userSchema);

module.exports = {
    User,
    Account,
};