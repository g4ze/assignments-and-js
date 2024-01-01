const { Router, query } = require("express");
const router = Router();
const {User, Course}= require("../db/index")
const bodyParser=require('body-parser');
const mongoose=require("mongoose");
const jwtpass="secret";
const userMiddleware = require("../middleware/user");
router.use(bodyParser.json());
// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic

    const usernameResponse = (req.body.username);
    const passwordResponse = (req.body.password);
    const found=await User.findOne({username: usernameResponse});
    if(!found){
        try{
    await User.create({
        username : usernameResponse,
        password: passwordResponse,
        
    }).then((admin) => {
        console.log("User created successfully:", admin);
        res.status(200).send("done");
    })
}
    catch(e){
        res.status(400).send("fill correct pass");
    }
    }
    else res.status(404).send("repeated user")
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const usernameResponse = (req.body.username);
    const passwordResponse = (req.body.password);
    const found=await User.findOne({username: usernameResponse});
    console.log(found)
    try{
        if(found.password===passwordResponse){
            const jwt=require('jsonwebtoken');
            const jwtpass="secret";
            res.status(200).send( jwt.sign({username: usernameResponse}, jwtpass));
        }
    }
    catch(e){
        res.status(200).send("auth failed");
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    
    res.status(200).send(await Course.find());
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    
    const jwt=require('jsonwebtoken')
    const username=await jwt.decode(req.headers.authorization, jwtpass).username;
    const course = await Course.findById(req.params.courseId);
    const user=await User.findOne({username:username});
    user.courses.push(course);
    await user.save();
    res.status(200).json({
        message: 'Course purchased successfully',
        user: user // Optionally, you can send the updated user data in the response
    });
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router