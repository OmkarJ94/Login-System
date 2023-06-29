import React, { useState, useEffect } from 'react'
import "./Signup.css"
import swal from 'sweetalert';
import { NavLink } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner'
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

const Login = () => {
    const History = useNavigate()
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Please Enter Email"),
        password: Yup.string().required("Please Enter Password"),

    })

    const initialValues = {
        email: "",
        password: "",
    }

    const onSubmit = async (values) => {
        console.log("data", values)

        try {

            setLoading(true)
            const { email, password } = values
            const res = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email, password
                }),
            });


            if (res.status !== 200 || !res) {
                setLoading(false)
                swal({
                    title: "Oops...!",
                    text: "Login Failed",
                    icon: "error",

                })



            } else {
                swal({
                    title: "Good",
                    text: "Login Succesfully",
                    icon: "success",

                })
                setLoading(false)

                History("/profilepage")


            }
        } catch (error) {
            console.log(error)
            setLoading(false)
            swal({
                title: "Oops...!",
                text: "Login Failed",
                icon: "error",

            })



        }
    }
    useEffect(() => {
        document.title = "Log In"
    })
    const [loading, setLoading] = useState(false)

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit} >


            <div className="container">
                <div className="box" style={{ padding: '15px', boxShadow: "0 12px 16px 0 rgba(0, 0, 0, 0.2)" }}>
                    <h1>Log In{loading && <Spinner />}</h1>
                    <Form>

                        <label className="label1"> Email</label>
                        <Field type="email" className='inputtag' placeholder="Enter Email" name="email" />
                        <div style={{ color: "red" }}><ErrorMessage name="email" /></div>


                        <label className="label1"> Enter Password</label>
                        <Field type="password" className='inputtag' placeholder="Enter Password" name="password" />
                        <div style={{ color: "red" }}><ErrorMessage name="password" /></div>

                        <p >
                            <span style={{ color: "black" }}>
                                {" "}
                                Don't have an account?
                            </span>
                            <NavLink to="/" style={{ color: "red" }}>
                                Register
                            </NavLink>
                        </p>
                        <NavLink to="/changepassword" style={{ color: "red" }}>
                            Forget Password
                        </NavLink>

                        <div class="button-container-div">
                            <button type="submit">Log IN</button>
                        </div>
                    </Form>

                </div>
            </div>
            {/* //  : <Information email={email} />} */}
        </Formik>
    )
}

export default Login
