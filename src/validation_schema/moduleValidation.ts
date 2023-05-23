import * as Yup from 'yup';

export const moduleValidations = Yup.object().shape({
    title: 
    Yup.string().required('Session name is a required field')
    .min(3,"Session name must be at least 3 characters"),
    course_id:
    Yup.string().required('Course is required field'),  
    status:
    Yup.string().required('Status is required field'),
    description:
    Yup.string().required('Description is a required field'),
   
});