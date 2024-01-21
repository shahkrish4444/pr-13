import { onValue, push, ref, remove, update } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { database } from '../firebase/Realtimefirebase'
import { useDispatch, useSelector } from 'react-redux'

const User = () => {
    const [input, setInput] = useState()
    const [edit, setEdit] = useState()
    const [item, setItem] = useState()
    const state = useSelector((state) => state.users);
    const [user, setUser] = useState([])
    const [id, setId] = useState()
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        userList();
    }, []);
    const userList = () => {
        const userRef = ref(database, "user");
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            const list = [];
            if (data) {
                const list = Object.keys(data).map((id) => ({ id, ...data[id] }));
                setUser(list)
            } else {
                console.log("The data which you have is not found ..")
            }
            dispatch({
                type: 'fetch',
                data: list
              });
        });
    }
    // End 
    const handleSubmit = async (e) => {

        e.preventDefault()
        if (edit && id) {
            try {
                await update(ref(database, `user/${id}`), input);
                setId(null);
                setInput();
                setEdit(false);
            } catch (e) {
                console.error("Error updating document: ", e);
            }
        } else {
            // add data in realtimefirebase 
            try {
                await push(ref(database, "user"), input);
                setInput();
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    }
    // handle delete 
    const handleDelete = async (id) => {
        try {
            await remove(ref(database, `user/${id}`));
            setUser((prevUser) => prevUser.filter((item) => item.id !== id));
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    }

    // handle edit
    const handleEdit = async (id) => {

        setInput(user.find((item) => item.id === id) || {});
        setId(id);
        setEdit(true);
    }
    return (
        <>
            <center>
        <h1 className='mt-5 mb-5 text-info'>Add User Info</h1>
                <form action="" onSubmit={handleSubmit}>
                    <input type="text" placeholder='Name' className='border-2' name='name' value={input ? input.name : ""} onChange={handleChange} />
                    <br />
                    <br />
                    <input type="text" placeholder='Email' className='border-2' name='email' value={input ? input.email : ""} onChange={handleChange} />
                    <br />
                    <br />
                    <button className='btn btn-warning ms-2'>{edit ? 'Update' : 'Add'}</button>
                </form>
            </center>
            <h1 className='text-center mt-4 mb-3 text-info'>
                Data of USER'S
            </h1>
            <table className='table border-5'>
                <thead>
                    <tr>
                        <th className='border-4 text-danger text-center bg-light fs-5'> Name</th>
                        <th className='border-4 text-danger text-center bg-light fs-5'>Email</th>
                        <th className='border-4 text-danger text-center bg-light fs-5'> Action </th>
                    </tr>
                </thead>
                <tbody>

                    {
                        user && user.map((item, index) => {

                            return <tr>
                                <td className='border-4 text-dark text-center bg-light fs-5'>{item.name}</td>
                                <td className='border-4 text-dark text-center bg-light fs-5'>{item.email}</td>
                                <td className='border-4 text-dark text-center bg-light fs-5'><button className='btn btn-primary me-1' onClick={() => handleEdit(item.id)}> Edit</button><button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button></td>
                            </tr>
                        })
                    }

                </tbody>
            </table>
        </>
    ) 
}

export default User