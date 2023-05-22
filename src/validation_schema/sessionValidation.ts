import * as Yup from 'yup';

export const sessionValidations = Yup.object().shape({
    title: 
    Yup.string().required('Session name is a required field')
    .min(3,"Session name must be at least 3 characters"),
    course_id:
    Yup.string().required('Course is required field'),
    module_id:
    Yup.string().required('Module is required field'),
    description:
    Yup.string().required('Description is a required field'),
    file:
    Yup.mixed().required('Attachment is a required field'),
});

export const sessionUpdateValidation = Yup.object().shape({
    title: 
    Yup.string().required('Session name is a required field')
    .min(3,"Session name must be at least 3 characters"),
    description: 
    Yup.string().required('description is a required field')
    .min(3,"description must be at least 3 characters"),
  
});  