const mongoose = require('mongoose');
const Joi = require('joi');

const UserSchema = new mongoose.Schema({
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
