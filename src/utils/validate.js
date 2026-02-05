// utils/validate.js
export const checkValidData = (email, password, name, number) => {
    // Always validate email
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        return "Email is Not Valid";
    }

    // Always validate password
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(password)) {
        return "Password is Not Valid";
    }

    // Validate name ONLY if it exists / non-empty
    if (name && name.trim() !== "") {
        if (!/^[a-zA-Z]+([ \-'][a-zA-Z]+)*$/.test(name)) {
            return "Enter Valid Name";
        }
    }

    // Validate number ONLY if it exists / non-empty
    if (number && number.trim() !== "") {
        if (!/^[2-9]\d{9}$/.test(number)) {
            return "Enter Valid Number";
        }
    }

    return null; // everything is valid
};
