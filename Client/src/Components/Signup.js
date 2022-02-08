import React, { useState, useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import swal from 'sweetalert';
import "./Signup.css"
import Spinner from './Spinner'

const Signup = () => {
    const History = useNavigate()
    useEffect(() => {
        document.title = "Sign up"
    })
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({
        name: "",
        email: "",
        dob: "",
        age: "",
        phone: "",
        gender: "",
        password: "",
        cpassword: "",

    })
    const showAlert = (message, bg) => {

        setTimeout(() => {

        }, 3000);
    }


    const submitData = async (e) => {

        e.preventDefault();
        try {
            const { name, email, dob, age, phone, gender, password, cpassword } = user;
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
    };

    const handleInputs = (e) => {
        let name, value;
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    }


    return (
        <>

            <div className="container">
                <div className="box" style={{ padding: '15px', boxShadow: "0 12px 16px 0 rgba(0, 0, 0, 0.2)" }}>

                    <h1>Sign Up{loading && <Spinner />}</h1>
                    <form>
                        <label className="label1"> Name</label>
                        <input type="text" className='inputtag' placeholder="Enter Name" name="name" value={user.name} onChange={handleInputs} />
                        <label className="label1"> Email</label>
                        <input type="email" className='inputtag' placeholder="Enter Email" name="email" value={user.email} onChange={handleInputs} />
                        <label className="label1">Date Of Birth</label>
                        <input type="date" className='inputtag' placeholder="Enter Date Of Birth" name="dob" value={user.dob} onChange={handleInputs} />
                        <label className="label1">Age</label>
                        <input type="number" className='inputtag' placeholder="Enter age" name="age" value={user.age} onChange={handleInputs} />
                        <label className="label1"> Phone</label>
                        <input type="tel" className='inputtag' placeholder="Enter Phone" name="phone" value={user.phone} onChange={handleInputs} />
                        <label className="label1"> Gender</label>
                        <input type="radio" name="gender" onChange={handleInputs} value="male" />
                        <label>Male</label>
                        &nbsp;
                        <input type="radio" name="gender" onChange={handleInputs} value="female" />
                        <label>Female</label>
                        &nbsp;
                        <input type="radio" name="gender" onChange={handleInputs} value="other" />
                        <label>Other</label>
                        <label className="label1"> Enter Password</label>
                        <input type="password" className='inputtag' placeholder="Enter Password" name="password" value={user.password} onChange={handleInputs} />
                        <label className="label1"> confirm Password</label>
                        <input type="password" className='inputtag' placeholder="Conform Password" name="cpassword" value={user.cpassword} onChange={handleInputs} />
                        <p >
                            <span style={{ color: "black" }}>
                                {" "}
                                Already Account?
                            </span>
                            <NavLink to="/login" style={{ color: "red" }}>
                                Log IN
                            </NavLink>
                        </p>

                        <div class="button-container-div">
                            <button onClick={submitData}>Submit</button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Signup
