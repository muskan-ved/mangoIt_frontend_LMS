import * as Yup from 'yup';

export const siteConfigValidations = Yup.object().shape({
    org_title: 
    Yup.string().required('Organisation title is a required field')
    .matches(/^[A-Za-z- ]*$/, 'Please enter valid organisation title Ex-"Mango-IT","XYZ"'),
    org_logoo: 
        Yup.mixed().required('Organisation logo is a required field'),
    org_favicoon: 
        Yup.mixed().required('Organisation favicon is a required field')
});