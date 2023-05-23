import * as Yup from 'yup';

export const siteConfigValidations = Yup.object().shape({
    org_title: 
    Yup.string().required('Org title is a required field')
    .min(5,"Org title must be at least 5 characters")
    .matches(/^[A-Za-z- ]*$/, 'Please enter valid org title'),
    org_logoo: 
        Yup.mixed().required('Org logo is a required field'),
    org_favicoon: 
        Yup.mixed().required('Org favicon is a required field')
});