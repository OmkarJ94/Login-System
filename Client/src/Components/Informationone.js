import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const Informationone = () => {
    const [alert, setAlert] = useState({ text: "", bg: "" })

    const History = useNavigate()
    const [user, setUser] = useState({
        name: "",
        gender: "",
        age: "",
        dob: "",
        phone: ""
    })

    const fetchdata = async () => {

        try {
            const res = await fetch("/getdata", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const data = await res.json();

            setUser({
                name: data.name,
                gender: data.gender,
                age: data.age,
                dob: data.dob,
                phone: data.phone
            });


            if (res.status !== 200) {

                swal({
                    title: "Oops...!",
                    text: "Something Went Wrong",
                    icon: "error",
                })
            }
        } catch (error) {

            History("/login");

            swal({
                title: "Oops...!",
                text: "You Must Be Logged In To View Profile Page",
                icon: "error",
            })

        }
    };
    // eslint-disable-next-line
    useEffect(() => {
        fetchdata();
        document.title = "Profile Page"
        // eslint-disable-next-line
    }, []);
    const logout = async () => {
        try {
            const res = await fetch("/logout", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            if (res) {
                History("/login");
                swal({
                    title: "Logout Successfull",

                    icon: "success",
                })
            }
        } catch (error) {
            window.alert("Error")
        }
    };
    return (
        <>

            <div className="container" >
                <div className="box" style={{ padding: '60px', boxShadow: "0 12px 16px 0 rgba(0, 0, 0, 0.2)" }}>
                    <h1>User Information</h1>
                    <p>User Name : {user.name}</p>
                    <p>User Age : {user.age}</p>
                    <p>User Gender : {user.gender}</p>
                    <p>User Birth Date : {user.dob}</p>
                    <p>User Mobile Number : {user.phone}</p>
                    <div class="button-container-div">
                        <button onClick={logout}>Logout</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Informationone
