const validate = (values) => {
    const errors = {};

    if (!values.username) {
        errors.username = 'Username is required';
    }

    if (!values.email) {
        errors.email = 'Email is required';
        /* eslint-disable no-useless-escape */
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
        errors.email = 'This is not a valid email address';
    }

    if (!values.phoneNumber) {
        errors.phoneNumber = 'Phone is required';
    }
    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 4) {
        errors.password = 'Password must be more than 4 characters';
    } else if (values.password.length > 10) {
        errors.password = 'Password cannot exceed more than 10 characters';
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirm Password is required';
    } else if (values.confirmPassword.length < 4) {
        errors.confirmPassword = 'Confirm Password must be more than 4 characters';
    } else if (values.confirmPassword.length > 10) {
        errors.confirmPassword = 'PassConfirm Password cannot exceed more than 10 characters';
    }

    if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Password don't match!";
    }

    return errors;
};

export default validate;
