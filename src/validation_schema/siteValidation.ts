import * as Yup from 'yup';

export const siteConfigValidations = Yup.object().shape({
    org_title: 
    Yup.string().required('Organisation title is a required field')
    .min(5,"Organisation title must be at least 5 characters")
    .matches(/^[A-Za-z- ]*$/, 'Please enter valid organisation title Ex-"Mango-IT"'),
    org_logoo: 
        Yup.mixed().required('Organisation logo is a required field'),
    org_favicoon: 
        Yup.mixed().required('Organisation favicon is a required field')
});