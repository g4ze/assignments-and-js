const { Router } = require("express");
const {Admin, Course}= require("../db/index")
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwtpass="secret";
const bodyParser=require('body-parser');
const zod=require('zod');


const passwordSchema = zod.string().min(6);

router.use(bodyParser.json())
// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic

    const usernameResponse = (req.body.username);
    const passwordResponse = (req.body.password);
    const found=await Admin.findOne({username: usernameResponse});
    if(!found){
        try{
    await Admin.create({
        username : usernameResponse,
        password: passwordResponse
    }).then((admin) => {
        console.log("Admin created successfully:", admin);
        res.status(200).send("done");
    })
}
    catch(e){
        res.status(400).send("fill correct pass");
    }
    }
    else res.status(404).send("repeated user")
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    
    const usernameResponse = (req.body.username);
    const passwordResponse = (req.body.password);
    const found=await Admin.findOne({username: usernameResponse});
    try{
        if(found.password===passwordResponse){
            const jwt=require('jsonwebtoken');

            res.status(200).send( jwt.sign({username: usernameResponse}, jwtpass));
        }
    }
    catch(e){
        res.status(200).send("suth failed");
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const{ title, description, price, imageLink}=req.body;
    const found=await Course.findOne({title:title});
    try{
        if(found.title===title){
        res.status(404).send("Repetitive");
    }
    }
    catch(e){
        
        res.status(200).send(await Course.create({
            title: title, 
         description: description, 
         price: price, 
         imageLink: imageLink
        }) );
       
    }
});

router.get('/courses', adminMiddleware,async (req, res) => {
    // Implement fetching all courses logic
    res.status(200).send(await Course.find());
});

module.exports = router;