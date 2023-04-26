import * as Yup from 'yup';


export const sessionValidations = Yup.object().shape({
    title: 
    Yup.string().required('Course name is a required field')
    .min(3,"Course name must be at least 3 characters"),
    status: 
    Yup.string().required('Status is a required field'), 
    long_description:
    Yup.string().required('Long description is a required field')
    .min(20,"Long description must be at least 20 characters"),
        
});