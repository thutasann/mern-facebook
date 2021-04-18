const User = require('../models/User')
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Token create
const createToken = (user) =>{
    return jwt.sign({ user }, process.env.SECRET, {
        expiresIn: '7d'
    });
};

// Register Validations
module.exports.registerValidations = [
    body("firstName").not().isEmpty().withMessage("First Name is Required"),
    body("lastName").not().isEmpty().withMessage("Last Name is required"),
    body("email").not().isEmpty().trim().withMessage("Email is required"),
    body("email").isEmail().withMessage("Invalid Email, Try Again"),
    body("password").isLength({ min: 6 }).withMessage("Password must be 6 characters long")
];

// register controller
module.exports.register = async (req,res) =>{
    const { firstName, lastName, email, password, bio } = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    try 
    {
        const checkUser = await User.findOne({ email });   
        if(checkUser){
            return res.status(400).json({ errors: [{ msg: 'Email is already taken'}] });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash( password, salt );

        try {
            const user = await User.create({
                firstName,
                lastName,
                email,
                password: hash,
                bio
            });
            const token = createToken(user);
            return res.status(200).json({ msg: 'Your Account has been created', token });
        } catch (error) {
            return res.status(500).json({ errors: error, msg: error.message });
        }
    } 
    catch (error) {
        return res.status(500).json({ errors: error, msg: error.message });
    }
}

// Login validations
module.exports.loginValidations = [
    body("email").not().isEmpty().trim().withMessage("Email is required"),
    body("email").isEmail().withMessage("Invalid Email, Try Again"),
    body("password").isLength({ min: 6 }).withMessage("Password must be 6 characters long"),
    body("password").not().isEmpty().withMessage("Password is required")
];

// Login controller
module.exports.login = async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try 
    {
        const user = await User.findOne({ email });
        if(user){
            const matched = await bcrypt.compare(password, user.password);
            if(matched){
                const token = createToken(user);
                return res.status(200).json({ msg: 'You has Loginned successfully', token });
            }
            else{
                return res.status(401).json({ errors: [{ msg: 'Incorrect Password'}] });
            }
        }
        else{
            return res.status(404).json({ errors: [{ msg: 'Email Not found' }] });
        } 
    } 
    catch (error) {
        return res.status(500).json({ errors: error, msg: error.message });
    }
};