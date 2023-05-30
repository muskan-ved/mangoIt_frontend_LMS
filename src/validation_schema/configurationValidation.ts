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

export const stripeConfigValidations = Yup.object().shape({
    org_pk:
        Yup.string().required('Publishable key is required field').matches(/^pk_test_[0-9a-zA-Z]{24,}$/, 'Invalid Publishable Key'),
    org_sk:
        Yup.string().required('Secret key is required field').matches(/^sk_test_[0-9a-zA-Z]{24,}$/, 'Invalid Secret API Key')
});