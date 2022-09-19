const validate = (values) => {
    const errors = {};
    const regexPhoneNumber = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regexSpecialCharacters = /^([a-zA-Z0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.-]+)$/;
    const regexSpace = /\s/;

    if (!values.username) {
        errors.username = 'Username is required';
    } else if (values.username.length < 5 || values.username.length > 16) {
        errors.username = 'Username is between 5 to 16 characters';
    } else if (!regexSpecialCharacters.test(values.username)) {
        errors.username = "Username must haven't special characters";
    } else if (regexSpace.test(values.username)) {
        errors.username = "Username must haven't white space";
    }
    if (!values.email) {
        errors.email = 'Email is required';
        /* eslint-disable no-useless-escape */
    } else if (!regexEmail.test(values.email)) {
        errors.email = 'This is not a valid email address';
    }

    if (!values.phoneNumber) {
        errors.phoneNumber = 'Phone is required';
    } else if (!regexPhoneNumber.test(values.phoneNumber)) {
        errors.phoneNumber = 'This is not a valid phone number';
    }
    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 8) {
        errors.password = 'Password must be more than 4 characters';
    } else if (values.password.length > 16) {
        errors.password = 'Password cannot exceed more than 10 characters';
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirm Password is required';
    } else if (values.confirmPassword.length < 8) {
        errors.confirmPassword = 'Confirm Password must be more than 4 characters';
    } else if (values.confirmPassword.length > 16) {
        errors.confirmPassword = 'PassConfirm Password cannot exceed more than 10 characters';
    }

    if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Password don't match!";
    }

    return errors;
};

export default validate;
