import * as Yup from 'yup';

export const sessionValidations = Yup.object().shape({
    title:
        Yup.string().required('Session name is a required field')
            .min(3, "Session name must be at least 3 characters")
            .matches(/^[a-zA-Z].*/, "Session Name must be start with a letter"),
    course_id:
        Yup.string().required('Course is required field'),
    module_id:
        Yup.string().required('Module is required field'),
    description:
        Yup.string().required('Description is a required field')
            .min(257, "Description must be at least 250 characters")
            .max(507, "Short description must be Maximum 500 characters"),
    file:
        Yup.mixed().required('Attachment is a required field'),
});

export const sessionUpdateValidation = Yup.object().shape({
    title:
        Yup.string().required('Session name is a required field')
            .min(3, "Session name must be at least 3 characters")
            .matches(/^[a-zA-Z].*/, "Session Name must be start with a letter"),
    course_id:
        Yup.string().required('Course is required field'),
    module_id:
        Yup.string().required('Module is required field'),
    description:
        Yup.string().required('Description is a required field')
            .min(257, "Description must be at least 250 characters")
            .max(507, "Short description must be Maximum 500 characters"),
})