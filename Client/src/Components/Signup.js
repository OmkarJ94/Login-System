import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import swal from 'sweetalert';
import Spinner from './Spinner'

const SignupFormik = () => {
  const History = useNavigate()
  const [loading, setLoading] = useState(false)
  const showAlert = (message, bg) => {

    setTimeout(() => {

    }, 3000);
  }

  console.log("here")
  const validationSchema = Yup.object({
    name: Yup.string().required("Please Enter Name"),
    email: Yup.string().email("Invalid email").required("Please Enter Emails"),
    dob: Yup.string().required("Please Enter Date Of Birth"),
    age: Yup.string().required("Please Enter Age"),
    phone: Yup.string().required("Please Enter Phone Number"),
    gender: Yup.string().required("Please Enter Gender"),
    password: Yup.string().required("Please Enter Password"),
    cpassword: Yup.string().required("Please Re-Enter Password"),
  })

  const initialValues = {
    name: "",
    email: "",
    dob: "",
    age: "",
    phone: "",
    gender: "",
    password: "",
    cpassword: "",
  }
  const onSubmit = async (values) => {
    console.log("data", values)
    try {
      const { name, email, dob, age, phone, gender, password, cpassword } = values;
      if (password !== cpassword) {

        showAlert("Invalid Creadential", "#FFBABA")
      }
      else {

        setLoading(true)
        const res = await fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            dob,
            age,
            phone,
            gender,
            password,
            cpassword,
          }),
        });
        // eslint-disable-next-line
        const result = await res.json();

        if (res.status !== 201 || !res) {
          setLoading(false)
          showAlert("Invalid Creadential", "#FFBABA")
          swal({
            title: "Invalid Creadential",
            text: "Please Enter Valid Data",
            icon: "error",
          })
        } else {
          setLoading(false)

          swal({
            title: "Registeration succesfull",
            text: "Thank You",
            icon: "success",
          })
          History("/login");
          showAlert("Registeration succesfull", "#DFF2BF")

        }
      }
    } catch (error) {
      setLoading(false)
      showAlert("Invalid Creadential", "#FFBABA")

    }
  }
  return (

    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit} >
      <div className="container">
        <div className="box" style={{ padding: '15px', boxShadow: "0 12px 16px 0 rgba(0, 0, 0, 0.2)" }}>

          <h1>Sign Up{loading && <Spinner />}</h1>
          <Form>
            <label className="label1"> Name</label>
            <Field type="text" className='inputtag' placeholder="Enter Name" name="name" />
            <br />
            <div style={{ color: "red" }}><ErrorMessage name="name" /></div>

            <label className="label1"> Email</label>
            <Field type="email" className='inputtag' placeholder="Enter Email" name="email" />       <br />
            <div style={{ color: "red" }}><ErrorMessage name="email" /></div>

            <label className="label1">Date Of Birth</label>
            <Field type="date" className='inputtag' placeholder="Enter Date Of Birth" name="dob" />       <br />
            <div style={{ color: "red" }}><ErrorMessage name="dob" /></div>

            <label className="label1">Age</label>
            <Field type="number" className='inputtag' placeholder="Enter age" name="age" />       <br />
            <div style={{ color: "red" }}><ErrorMessage name="age" /></div>

            <label className="label1"> Phone</label>
            <Field type="tel" className='inputtag' placeholder="Enter Phone" name="phone" />       <br />
            <div style={{ color: "red" }}><ErrorMessage name="phone" /></div>

            <label className="label1"> Gender</label>
            <Field type="radio" name="gender" value="male" />
            <label>Male</label>
            &nbsp;
            <Field type="radio" name="gender" value="female" />
            <label>Female</label>
            &nbsp;
            <Field type="radio" name="gender" value="other" />
            <label>Other</label>       <br />
            <div style={{ color: "red" }}><ErrorMessage name="gender" /></div>

            <label className="label1"> Enter Password</label>
            <Field type="password" className='inputtag' placeholder="Enter Password" name="password" />       <br />
            <div style={{ color: "red" }}><ErrorMessage name="password" /></div>

            <label className="label1"> confirm Password</label>
            <Field type="password" className='inputtag' placeholder="Conform Password" name="cpassword" />       <br />
            <div style={{ color: "red" }}><ErrorMessage name="cpassword" /></div>
            <p >
              <span style={{ color: "black" }}>
                {" "}
                Already Account?
              </span>
              <NavLink to="/login" style={{ color: "red" }}>
                Log IN
              </NavLink>
            </p>

            <div className="button-container-div">
              <button type="submit">Submit</button>
            </div>
          </Form>

        </div>
      </div>
    </Formik>
  )
}

export default SignupFormik