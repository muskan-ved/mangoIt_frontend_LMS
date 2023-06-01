import * as Yup from 'yup';

export const courseValidations = Yup.object().shape({
    title: 
        Yup.string().required('Course name is a required field')
        .min(3,"Course name must be at least 3 characters")
        .matches(/^[a-zA-Z].*/, "Course Name must be start with a letter"),
    status: 
        Yup.string().required('Status is a required field'), 
    is_chargeable: 
        Yup.string().required('Type is a required field'),
    short_description:
        Yup.string().required('Short description is a required field')
        .min(27,"Short description must be at least 20 characters"),
    long_description:
        Yup.string().required('Long description is a required field')
        .min(57,"Long description must be at least 50 characters"),
});