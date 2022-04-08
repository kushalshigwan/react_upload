const no_digit_regex = /\d/g;
const digit_regex = /\D/g;
const space_regex = /\W/g;
const password_length_regex = /^.{6,20}$/g;
const alpha_numeric_regex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/g;
const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validateCombo ( value,rules ) {
    // console.log(value)
    const val = value.toString().trim()
    if ( rules.includes( 'REQUIRED' ) && val === '' ) return ( 'This Field is required' )
    if ( rules.includes( 'ALPHANUMERIC' ) && val.match( alpha_numeric_regex ) ) return ( 'only alphanumeric characters' )
    if ( rules.includes( 'NODIGIT' ) && val.match( no_digit_regex ) ) return ( 'No digits are allowed' )
    if ( rules.includes( 'DIGIT' ) && val.match( digit_regex ) ) return ( 'Only digits are allowed' )
    if ( rules.includes( 'NOSPACE' ) && val.match( space_regex ) ) return ( 'Space not allowed' )
    if ( rules.includes( 'EMAIL' ) && !val.match( email_regex ) ) return ( 'Invalid email' )
    if ( rules.includes( '6-20' ) && !val.match( password_length_regex ) ) return ( 'Password should be 6-20 characters long' )
    return ''
}

function validateCode ( Code ) {
    const alpha_numeric_regex = /^[ A-Za-z0-9]*/;
    if ( Code === '' ) return ( 'Code is required' )
    if ( Code.match( alpha_numeric_regex ) ) return ( 'only alphanumeric characters' )
    return ''
}
function validateFullname ( fullname ) {
    const digit_regex = /\d/g;
    const space_regex = /\W/g;
    if ( fullname === '' ) return ( 'Fullname is required' )
    if ( fullname.match( digit_regex ) ) return ( 'No digits are allowed' )
    if ( fullname.match( space_regex ) ) return ( 'Space not allowed' )
    return ''
}
function validateEmail ( email ) {
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if ( email === '' ) return ( 'Email is required' )
    if ( !email.match( email_regex ) ) return ( 'Invalid email' )
    return ''
}
function validatePassword ( password ) {
    const password_length_regex = /^.{6,20}$/g;
    if ( password === '' ) return ( 'Password is required' )
    if ( !password.match( password_length_regex ) ) return ( 'Password should be 6-20 characters long' )
    return ''
}
function validateCPassword ( cpassword,password ) {
    if ( cpassword === '' ) return ( 'Confirm Password is required' )
    return ''
}
function validateIAgree ( iagree ) {
    if ( !iagree ) return ( 'agree the terms and conditions' )
    return ''
}

export { validateFullname,validateEmail,validatePassword,validateIAgree,validateCPassword,validateCode,validateCombo }