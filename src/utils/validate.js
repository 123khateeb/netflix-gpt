export const checkValidData = (email, password, name, number) =>{
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(password);
    const isNameValid = /^[a-zA-Z]+([ \-'][a-zA-Z]+)*$/.test(name);
    const isNumberValid = /^[2-9]\d{9}$/.test(number);

    if(!isEmailValid){
        return "Email is Not Valid"
    }
    if(!isPasswordValid){
        return "Password is Not Valid"
    }
    if(!isNameValid){
        return "Enter Valid Name"
    }
    if(!isNumberValid){
        return "Enter Valid Number"
    }
    return null;
}