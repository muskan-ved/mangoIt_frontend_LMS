import * as Yup from 'yup';


export const sessionValidations = Yup.object().shape({
    title: 
    Yup.string().required('Session name is a required field')
    .min(3,"Session name must be at least 3 characters"),
    course_id:
    Yup.string().required('Course is required field'),
    module_id:
    Yup.string().required('Module is required field'),
    // status: 
    // Yup.string().required('Status is a required field'), 
    // description:
    // Yup.string().required('description is a required field'),
    // attachment:
    // Yup.string().required('attachment is a required field')
        
});