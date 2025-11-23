const mongoose = require('mongoose');
const joi = require('joi');

const SuperAdminSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'superadmin'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const SuperAdmin = mongoose.model('SuperAdmin', SuperAdminSchema);

const validateSuperAdminLogin = (data) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    });
    return schema.validate(data);
}

module.exports = {
    SuperAdmin,
    validateSuperAdminLogin
};

