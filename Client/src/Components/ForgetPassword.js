import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import ConfirmedPassword from "./ConfirmedPassword";
import Spinner from "./Spinner";
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

const Changepassword = () => {
    const [loading, setLoading] = useState(false);
    const [form, setform] = useState(true);
    const [email, setEmail] = useState();
    useEffect(() => {
        document.title = "Forgot Password"
    })
    const History = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Please Enter Email"),

    })

    const initialValues = {
        email: "",
    }

    const onSubmit = async (values) => {
        
        try {

            setLoading(true);
            const { email } = values
            setEmail(email)
            const res = await fetch("/reset", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                }),
            });

            if (res.status !== 200 || !res) {
                setLoading(false);

                swal({
                    title: "Oops...!",
                    text: "User not found",
                    icon: "error",
                })

            } else {
                setLoading(false);
                swal("OTP Send to Your Mail Id");
                swal({
                    title: "Good",
                    text: "OTP Send to Your Mail Id",
                    icon: "success",
                })

                setform(false);
            }
        } catch (error) {
            
            setLoading(false);

            swal({
                title: "Oops...!",
                text: "Something went wrong",
                icon: "error",
            })

        }
    }


    const checkUser = async (e) => {
        e.preventDefault();

    };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit} >
            {form ? (
                <div className="container">
                    <ol>
                    </ol>
                    <div className="box" style={{ padding: '60px', boxShadow: "0 12px 16px 0 rgba(0, 0, 0, 0.2)" }}>
                        <h1>Forgot your password?{loading && <Spinner />}</h1>
                        <li>Enter your email address below.</li>
                        <li>Our system will send you a OTP.</li>
                        <li>Use the OTP to reset your password.</li>
                        <Form>

                            <label className="label1"> Email</label>
                            <Field type="email" className='inputtag' placeholder="Enter Email" name="email" />
                            <div style={{ color: "red" }}><ErrorMessage name="email" /></div>
                            <div className="button-container-div" >
                                <button type="submit">Get OTP</button>
                                <button style={{ marginLeft: "4px" }} onClick={() => { History("/login") }}>Back to Login</button>
                            </div>

                        </Form>

                    </div>
                </div>
            )
                :
                (
                    <ConfirmedPassword email={email} />

                )
            }
        </Formik>
    );
};

export default Changepassword;