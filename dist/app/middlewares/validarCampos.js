"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validarCampos = (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.json({
                ok: false,
                msg: errors.errors[0].msg
            });
        }
        next();
    }
    catch (err) {
        console.log(err);
    }
};
exports.default = validarCampos;
//# sourceMappingURL=validarCampos.js.map