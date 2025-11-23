const jwt = require('jsonwebtoken');

const CreateJwt = (data) => {
    try {
        const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    } catch (error) {
        console.error("Error creating JWT:", error);
        return null;
    }
};

module.exports = CreateJwt;
