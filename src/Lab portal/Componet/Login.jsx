import React, { useState } from 'react'
import style from "../Style/style.css"
import { auth } from '../firebase/Realtimefirebase'
import { Navigate, useNavigate } from 'react-router-dom'
const Login = () => {
    const [input , setInput] = useState()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await auth.signInWithEmailAndPassword(email, password);
            navigate("/dash")
          } catch (error) {
            console.error(error);
            alert("Somthig gone wrong!")
          }
    }
    const handleEmail = (e) =>{
        setEmail(e.target.value)
    }
    const handlePassword=(e)=>{
        setPassword(e.target.value)
    }
    return (
        <>
           

                <div className="login-page">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 ">
                                <h3 className="mb-3 text-center text-info">Login Here</h3>
                                <div className="">
                                    <div className="row">
                                        <div className="col-md-12 pe-0">
                                            
                                            <div className="form-left h-100 py-5 px-5">
                                                <form action className="row g-4" onSubmit={handleSubmit}>
                                                    <div className="col-6">
                                                        <label className='text-info mb-3 fs-5'>Username<span className="text-danger">*</span></label>
                                                        <div className="input-group">
                                                            
                                                            <input type="text" className="form-control" placeholder="Enter Username" onChange={(e)=>handleEmail(e)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <label className='text-info mb-3 fs-5'>Password<span className="text-danger">*</span></label>
                                                        <div className="input-group">
                                                            
                                                            <input type="password" className="form-control" placeholder="Enter Password" onChange={(e)=>handlePassword(e)} />
                                                        </div>
                                                    </div>
                                                 
                                                    
                                                    <div className="col-12 d-flex mx-auto text-center">
                                                        
                                                        <button className="btn btn-success text-dark fs-5 px-4 float-end mt-4"  >login</button> 
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>

            
        </>
    )
}

export default Login