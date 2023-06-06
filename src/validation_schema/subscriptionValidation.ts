import * as Yup from 'yup';

export const subscriptionValidations = Yup.object().shape({
    name:
        Yup.string().required('Subscription name is a required field')
            .min(3, "Subscription name must be at least 3 characters"),
    price:
        Yup.string().required('Price is required field')
        .matches(/^[0-9].*/, "Price must be a number"),
    duration:
        Yup.string().required('Duration date is required field'),
    duration_term:
        Yup.string().required('Duration term (Week/Month/Year) is required field'),
    duration_value:
        Yup.string().required('Duration value is required field')
        .matches(/^[0-9].*/, "duration value must be a number"),
    description:
        Yup.string().required('Description is a required field').min(27, "Description must be at least 20 characters"),
});
