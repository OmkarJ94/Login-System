import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Spinner from "./Spinner";

const ConfirmedPassword = (props) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        Otp: "",
        email: props.email,
        password: "",
        cpassword: "",
    });
    useEffect(() => {
        document.title = "Forgot Password"
    })
    const History = useNavigate();
    const handleInputs = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setData({ ...data, [name]: value });
    };
    const changePassowrd = async (e) => {
        e.preventDefault();
        try {
            if (
                data.password !== data.cpassword ||
                !data.cpassword ||
                !data.password
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
                        Otp: data.Otp,
                        email: data.email,
                        password: data.password,
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
    };
    return (
        <>
            <div className="container">
                <ol>
                </ol>
                <div className="box" style={{ padding: '60px', boxShadow: "0 12px 16px 0 rgba(0, 0, 0, 0.2)" }}>
                    <h1>Forgot your password?{loading && <Spinner />}</h1>

                    <form>
                        <label className="label1"> Enter Your OTP</label>
                        <input type="text" className='inputtag' placeholder="Enter OTP" name="Otp" onChange={handleInputs} />
                        <label className="label1"> Enter New Password</label>
                        <input type="password" className='inputtag' placeholder="Enter password" name="password" onChange={handleInputs} />
                        <label className="label1">confirmed Password</label>
                        <input type="password" className='inputtag' placeholder="confirmed Password" name="cpassword" onChange={handleInputs} />
                        <div class="button-container-div">

                            <button style={{ marginLeft: "4px" }} onClick={changePassowrd}>Submit</button>
                            <button style={{ marginLeft: "4px" }} onClick={() => { History("/login") }}>Cancel</button>
                        </div>

                    </form>

                </div>
            </div>
        </>

    );
};
export default ConfirmedPassword;