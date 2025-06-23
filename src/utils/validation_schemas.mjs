
export const createUserValidationSchema = {
    username:{
        isLength:{
            options: {
                min: 5,
                max:40
            },
            errorMessage: "Username must be between 5 and 40 characters long",
        },
        notEmpty: {
            errorMessage: "Username shouldn't be empty"
        },
        isString: {
            errorMessage: "Username must be a string"
        },
    },
    displayName: {
        notEmpty: true
    }
};