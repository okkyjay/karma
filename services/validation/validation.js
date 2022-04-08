const Joi = require('joi')

const requestValidation = (data) => {
    const boundValidation = Joi.object({
        from: Joi.string().min(6).required().max(16).messages({
            "string.min": `"from" should have a minimum length of {#limit}`,
            "string.max": `"from" should have a maximum length of {#limit}`,
            "string.empty": `"from" is missing`
        }),
        to: Joi.string().min(6).required().max(16).messages({
            "string.min": `"from" should have a minimum length of {#limit}`,
            "string.max": `"from" should have a maximum length of {#limit}`,
            "string.empty": `"from" is missing`,
            "required": `"from" is missing`,
        }),
        text: Joi.string().min(1).required().max(120).messages({
            "string.min": `"from" should have a minimum length of {#limit}`,
            "string.max": `"from" should have a maximum length of {#limit}`,
            "string.empty": `"from" is missing`
        }),
    })
    return boundValidation.validate(data)
}

module.exports = {
    requestValidation
}