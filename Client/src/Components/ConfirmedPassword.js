import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Spinner from "./Spinner";
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

const ConfirmedPassword = (props) => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState({ email: props.email });
    useEffect(() => {
        document.title = "Forgot Password"
    })
    const History = useNavigate();

    const validationSchema = Yup.object({
        Otp: Yup.number().required("Enter the OTP"),
        password: Yup.string().required("Please Enter Password"),
        cpassword: Yup.string().required("Please Re-Enter Password"),

    })
    const initialValues = {
        Otp: "",
        cpassword: "",
        password: "",
    }

    const onSubmit = async (values) => {
        
        const { password, cpassword, Otp } = values
        
        try {
            if (
                password !== cpassword ||
                !cpassword ||
                !password
            ) {
                swal("Password Not Matching");
            } else {
                setLoading(true);
                const response = await fetch("/changepassword", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        Otp: Otp,
                        email: email,
                        password: password,
                    }),
                });
                
                if (response.status === 404 || !response) {

                    setLoading(false);

                    swal({
                        title: "Oops...!",
                        text: "Enter Valid Data Check All Fields",
                        icon: "error",
                    })
                } else if (response.status === 401) {
                    setLoading(false);
                    swal({
                        title: "Oops...!",
                        text: "Your OTP Expired! Please Try Again",
                        icon: "error",
                    })
                } else if (response.status === 200) {
                    setLoading(false);

                    swal({
                        title: "Good",
                        text: "Your Password has been updated successfully",
                        icon: "success",
                    })
                    History("/login");
                }
                
            }
        } catch (error) {
            setLoading(false);
            swal("something went wrong");
        }
    }
    // const handleInputs = (e) => {
    //     let name = e.target.name;
    //     let value = e.target.value;
    //     setData({ ...data, [name]: value });
    // };
    // const changePassowrd = async (e) => {
    //     e.preventDefault();
    //     try {
    //         if (
    //             password !== cpassword ||
    //             !cpassword ||
    //             !password
    //         ) {
    //             swal("Password Not Matching");
    //         } else {
    //             setLoading(true);
    //             const response = await fetch("/changepassword", {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({
    //                     Otp: Otp,
    //                     email: email,
    //                     password: password,
    //                 }),
    //             });

    //             if (response.status === 404 || !response) {

    //                 setLoading(false);

    //                 swal({
    //                     title: "Oops...!",
    //                     text: "Enter Valid Data Check All Fields",
    //                     icon: "error",
    //                 })
    //             } else if (response.status === 401) {
    //                 setLoading(false);
    //                 swal({
    //                     title: "Oops...!",
    //                     text: "Your OTP Expired! Please Try Again",
    //                     icon: "error",
    //                 })
    //             } else if (response.status === 200) {
    //                 setLoading(false);

    //                 swal({
    //                     title: "Good",
    //                     text: "Your Password has been updated successfully",
    //                     icon: "success",
    //                 })
    //                 History("/login");
    //             }
    //         }
    //     } catch (error) {
    //         setLoading(false);
    //         swal("something went wrong");
    //     }
    // };
    return (
        <Formik initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>

            <div className="container">
                <ol>
                </ol>
                <div className="box" style={{ padding: '60px', boxShadow: "0 12px 16px 0 rgba(0, 0, 0, 0.2)" }}>
                    <h1>Forgot your password?{loading && <Spinner />}</h1>

                    <Form>
                        <label className="label1"> Enter Your OTP</label>
                        <Field type="text" className='inputtag' placeholder="Enter OTP" name="Otp" />
                        <div style={{ color: "red" }}><ErrorMessage name="Otp" /></div>

                        <label className="label1"> Enter New Password</label>
                        <Field type="password" className='inputtag' placeholder="Enter password" name="password" />
                        <div style={{ color: "red" }}><ErrorMessage name="password" /></div>

                        <label className="label1">confirmed Password</label>
                        <Field type="password" className='inputtag' placeholder="confirmed Password" name="cpassword" />
                        <div style={{ color: "red" }}><ErrorMessage name="cpassword" /></div>

                        <div class="button-container-div">

                            <button type="submit" style={{ marginLeft: "4px" }} >Submit</button>
                            <button style={{ marginLeft: "4px" }}>Cancel</button>
                        </div>

                    </Form>

                </div>
            </div>
        </Formik>

    );
};
export default ConfirmedPassword;