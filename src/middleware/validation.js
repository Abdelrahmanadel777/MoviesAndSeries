import { AppError } from "../utilities/AppError.js"

export const validation = (schema) => {
    return (req, res, next) => {
        let dataValidation = { ...req.body, ...req.params, ...req.query }
        if (req.file) {
            dataValidation[req.file.fieldname] = req.file
        }
        if (req.files) {
            for (const key in req.files) {
                dataValidation[key] = req.files[key]
            }
        }
        let { error } = schema.validate(dataValidation)
        if (error) {
            error.message = error.message.replaceAll("\"", "")
            return next(new AppError(error.message, '500'))
        }
        next()
    }
}