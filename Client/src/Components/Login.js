import React, { useState } from 'react'
import "./Signup.css"
import swal from 'sweetalert';
import { NavLink } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner'

// import Informationone from './Informationone';
const Login = () => {
    const History = useNavigate()
    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState("");

    const loginUser = async (e) => {
        e.preventDefault();

        try {

            setLoading(true)
            const res = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
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
            setLoading(false)
            swal({
                title: "Oops...!",
                text: "Login Failed",
                icon: "error",

            })



        }
    };
    return (
        <div>


            <div className="container">
                <div className="box" style={{ padding: '60px', boxShadow: "0 12px 16px 0 rgba(0, 0, 0, 0.2)" }}>
                    <h1>Log In{loading && <Spinner />}</h1>
                    <form>

                        <label className="label1"> Email</label>
                        <input type="email" className='inputtag' placeholder="Enter Email" name="email" onChange={(e) => {
                            setEmail(e.target.value)
                        }} />



                        <label className="label1"> Enter Password</label>
                        <input type="password" className='inputtag' placeholder="Enter Password" name="password" onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
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
                            <button onClick={loginUser}>Log IN</button>
                        </div>
                    </form>

                </div>
            </div>
            {/* //  : <Information email={email} />} */}
        </div>
    )
}

export default Login
