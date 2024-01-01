const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://nilay:YrQhhHQ658WUosKO@cluster0.ogyb8hy.mongodb.net/');

// Define schemas


const CourseSchema = new mongoose.Schema({
    // Schema definition here
     title: String, 
     description: String, 
     price: Number, 
     imageLink: String
})

const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String,
    courses: [CourseSchema]
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String,
    courses: [CourseSchema]
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}