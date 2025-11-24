const mongoose = require('mongoose');
const Joi = require('joi');

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        trim: true,
        default: ""
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        default: "Male"
    },
    mobileno: {
        type: String,
        trim: true,
        default: ""
    },
    prof: {
        type: String,
        trim: true,
        default: ""
    },
    fulladdress: {
        type: String,
        trim: true,
        default: ""
    },
    startdate: {
        type: Date,
        default: null
    },
    enddate: {
        type: Date,
        default: null
    },

    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",   
        required: false
    },

    batch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch",  
        required: false
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    studentid:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: { 
        type: String,
        required: true
    },
    isActive: {
        type: String,
        enum: ['Active', 'Complete', 'Ongoing'], 
        default: 'Active'
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);

const validateUser = (data) => {
    const schema = Joi.object({ 
        fullname: Joi.string().optional(),
        gender: Joi.string().valid("Male","Female","Other"),
        mobileno: Joi.string().optional(),
        prof: Joi.string().optional(),
        fulladdress: Joi.string().optional(),
        startdate: Joi.date().optional(),
        enddate: Joi.date().optional(),
        course: Joi.string().optional(),
        batch: Joi.string().optional(),

        studentid : Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().default('user'), 
        isActive: Joi.string().valid('Active', 'Complete', 'Ongoing')
    });
    return schema.validate(data);
}

module.exports = {
    User,
    validateUser
};
