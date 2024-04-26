const { body,check } = require("express-validator")

const createUserValidation = () => [
    check("name", "name is required").notEmpty(),
    check("email", "email is required").notEmpty().isEmail(),
    check("scheduledAt","schedule date is required and valid date").notEmpty().isISO8601().toDate()
    .custom((value, { req }) => {
        const scheduledDate = new Date(value)
        const currentDate = new Date()
        console.log('currentData',currentDate)
        console.log('scheduledDate',scheduledDate)
        if (scheduledDate <= currentDate) {
          throw new Error("schedule date will be after current datetime")
        }
        return true
    })
]

const updateUserValidation = () => [
    check("name", "name is required").optional(),
    check("email", "email is required").optional().isEmail(),
    check("scheduledAt","schedule date is required and valid date").optional().isISO8601().toDate()
    .custom((value, { req }) => {
        const scheduledDate = new Date(value)
        const currentDate = new Date()
        console.log('currentData',currentDate)
        console.log('scheduledDate',scheduledDate)
        if (scheduledDate <= currentDate) {
          throw new Error("schedule date will be after current datetime")
        }
        return true
    }),
]

const statusUserValidation = () => [
    check("status", "status is required").notEmpty().isIn(['scheduled','sent','failed']).withMessage('status invalid')
]

module.exports = {createUserValidation,updateUserValidation,statusUserValidation}