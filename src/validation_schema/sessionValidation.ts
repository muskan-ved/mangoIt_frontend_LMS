import * as Yup from 'yup';


export const sessionValidations = Yup.object().shape({
    first_name: 
        Yup.string().required('First name is a required field')
        .min(3,"First name must be at least 3 characters")
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name'),
    last_name: 
        Yup.string().required('Last name is a required field')
        .min(3,"Last name must be at least 3 characters")
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name'),
        
});