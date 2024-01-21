import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth, database } from '../firebase/Realtimefirebase';
import { onAuthStateChanged } from 'firebase/auth';

function Header() {
    const [user, setUser] = useState();
    const [activeuser, setActiveuser] = useState();
    const [pc, setPc] = useState();
    const [assign, setAssign] = useState();
    const navigate = useNavigate();
    const handleLogout = () => {
        auth
        .signOut()
        .then(() => {
          setUser(null);
          navigate("/login");
        })
        .catch((error) => {
          console.error('Error logging out:', error);
        });
    }
    const fetchData = (refName, setStateFunction) => {
        const dataRef = ref(database, refName);
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const list = Object.keys(data).map((id) => ({ id, ...data[id] }));
                setStateFunction(list);
            } else {
                console.log(`Data not found for ${refName}`);
            }
        });
    };

    useEffect(() => {
        fetchData('pc', setPc);
        fetchData('user', setUser);
        fetchData('assign', setAssign);
    }, []);
    useEffect(() => {
        
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setActiveuser(user);
          } else {
            setActiveuser(null);
          }
        });
})    
    
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light text-center">
                <div className="container-fluid text-center align-items-center">
                    <a className="navbar-brand" href="#">
                        Lab Portal Project
                    </a>
                    <div class="" id="navbarNav">
                        <ul className="navbar-nav">
                            {activeuser ? (
                                <>
                                <li className="nav-item">
                                        <Link to={"/"} className="nav-link">
                                            Home
                                        </Link>
                                    </li>
                                <li className="nav-item">
                                        <Link to={"/dash"} className="nav-link">
                                            Dashbord
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={"/user"} className="nav-link">
                                            User
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={"/pc"} className="nav-link">
                                            Pc
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={"/assign"} className="nav-link">
                                            Assign
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <button className="btn btn-primary" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ):(
                                <>
                                <li className="nav-item">
                                        <Link to={"/"} className="nav-link">
                                            Home
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={"/login"} className="nav-link">
                                            Login
                                        </Link>
                                    </li>
                                </>
                            )}            
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;