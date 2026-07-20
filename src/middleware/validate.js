const { body, validationResult } = require('express-validator');

const productValidationRules = () => {
    return [
        body('name')
            .trim()
            .notEmpty()
            .withMessage('Name is required.'),
        body('price')
            .isFloat({ gt: 0 })
            .withMessage('Price must be a number greater than 0.'),
        body('unit')
            .trim()
            .notEmpty()
            .withMessage('Unit is required (e.g., kg, piece).'),
        body('stock')
            .isInt({ min: 0 })
            .withMessage('Stock must be a positive integer.')
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    return res.status(400).json({
        errors: errors.array().map(err => ({ field: err.path, message: err.msg }))
    });
};

module.exports = {
    productValidationRules,
    validate
};