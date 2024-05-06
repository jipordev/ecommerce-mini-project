"use client";
import React, { useState } from "react";
import style from "./style.module.css";

import { IoEyeOffSharp } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {productApi} from "@/redux/service/product";
import Loading from "@/app/(user)/loading";
import { useSession, signIn, signOut} from "next-auth/react"
import { FcGoogle,  } from "react-icons/fc";
import {FaGithub} from "react-icons/fa6";
import {useAppDispatch} from "@/redux/hooks";
import {selectToken, setAccessToken} from "@/redux/features/auth/authSlice";
import {useRouter} from "next/navigation";

type ValueTypes = {
    email: string;
    password: string;
};

const initialValues: ValueTypes = {
    email: "",
    password: ""
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required")
});

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
        // Toggle password visibility
    };
    const dispatch = useAppDispatch()
    const { data: session } = useSession()
    const router = useRouter()

    //  handle submit
    const handleLogin = async (values: ValueTypes) => {

        const {email, password} = values
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/login', {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password}),
        });
        res.json().then(res => res.json()).then(data => {
            console.log("Data in jwt test", data);
            dispatch(setAccessToken(data.accessToken))
        }).catch(err => console.log(err)
        );
        if (res.status === 200) {
            router.push("/");
        }
    }

    if (loading) {
        return (
            <div className={`${style.container}`}>
                <h1 className="text-6xl text-center"><Loading/></h1>
            </div>
        );
    }

    if (session) {
        // rendering components for logged in users
        return (
            <div className="w-full h-screen flex flex-col justify-center items-center">
                <div className="w-44 h-44 relative mb-4">
                    <Image src={session.user?.image as string} fill alt="" className="object-cover rounded-full"/></div>
                <p className="text-2xl mb-2">Welcome <span className="font-bold">{session.user?.name}</span>. Signed In As</p>
                <p className="font-bold mb-4">{session.user?.email}</p>
                <button className="bg-red-600 py-2 px-6 rounded-md" onClick={() => signOut()}>Sign out</button></div>) }

    return (
        <div className={`${style.container}`}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(value) => {
                    handleLogin(value);
                }}>
                    <Form className="bg-gray-100 p-4 rounded-lg w-96">
                        <h1 className={`${style.title}`}>Login</h1>
                        {/* Email */}
                        <div className="mb-5">
                            <label className={`${style.label}`} htmlFor="email">
                                Email
                            </label>
                            <Field
                                type="email"
                                name="email"
                                id="email"
                                className={`${style.input}`}
                            />
                            <ErrorMessage
                                name="email"
                                component="section"
                                className={`${style.error}`}
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-5">
                            <label className={`${style.label}`} htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <Field
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    className={`${style.input}`}
                                />
                                {!showPassword ? (
                                    <IoEyeOffSharp
                                        onClick={() => handleShowPassword()}
                                        className="cursor-pointer absolute right-2 top-4"
                                    />
                                ) : (
                                    <IoEyeSharp
                                        onClick={() => handleShowPassword()}
                                        className="cursor-pointer absolute right-2 top-4"
                                    />
                                )}
                            </div>
                            <ErrorMessage
                                name="password"
                                component="section"
                                className={`${style.error}`}
                            />
                        </div>
                        <div>
                            <button type="submit"
                                    className={`${style.button}`}
                            >
                                Login
                            </button>
                        </div>
                    </Form>
            </Formik>
            <div className="mt-4 w-full flex flex-row gap-4 justify-center items-center">
                <button className="text-2xl bg-transparent hover:bg-gray-100 py-2 px-6 rounded-md text-white mb-2"
                        onClick={() => signIn('google', {callbackUrl: '/'})}><FcGoogle/>
                </button>
                <button className="text-2xl bg-none hover:bg-gray-100 border-gray-300 border py-2 px-6 rounded-md mb-2"
                        onClick={() => signIn('github', {callbackUrl : '/'})}><FaGithub/>
                </button>
            </div>
        </div>
    );
}