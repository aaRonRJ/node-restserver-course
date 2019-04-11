const jwt = require("jsonwebtoken");

// Verificación de token
let verifyToken = (req, response, next) => {
    let token = req.get("Authorization");

    jwt.verify(token, process.env.SEED_TOKEN, (error, decoded) => {
        if (error) {
            return response.status(401).json({
                ok: false,
                error: {
                    message: "Token no válido"
                }
            });
        }

        req.user = decoded.user;
        next();
    });
};

// Verificación de ADMIN_ROLE
let verifyAdminRole = (req, response, next) => {
    let userRole = req.user.role;

    if (userRole !== "ADMIN_ROLE") {
        return response.status(401).json({
            ok: false,
            error: {
                message: "Unauthorized, only ADMIN"
            }
        });
    }

    next();
};

module.exports = {
    verifyToken,
    verifyAdminRole
};