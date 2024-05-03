import React from 'react';
import {Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useLoginMutation} from "@/redux/service/auth";

type ValueTypes = {
    email: string,
    password: string,
}
const initialValues: ValueTypes = {
    email: "",
    password: ""
}
const handleSubmit = (values: ValueTypes) => {

}

function Login() {

    const validations = Yup.object().shape({
        email: Yup.string().email().required('Email is required'),
        password: Yup.string().required('Password is required')
            .min(8, "Password must be at least 8 characters long")
            .matches(/[a-zA-Z]/, 'Password can only contain latin letter'),
    })



    return (
        <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}>

        </Formik>
    );
}

export default Login;