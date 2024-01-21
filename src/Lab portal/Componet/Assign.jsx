import React, { useEffect, useState } from 'react';
import { database, app } from '../firebase/Realtimefirebase';
import { onValue, push, ref, update, db, remove, serverTimestamp } from 'firebase/database';
import { addDoc, collection, deleteDoc, deleteField, doc, getDoc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';

const Assign = () => {
    const [user, setUser] = useState([]);
    const [pc, setPc] = useState([]);
    const [input, setInput] = useState({});
    const [id, setId] = useState(null);
    const db = getFirestore(app);
    const [assign, setAssign] = useState([]);
    const [edit, setEdit] = useState(false);

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (edit && id) {
            try {
                const isPcAssigned = assign.some((item) => item.pc === input.pc);
                await update(ref(database, `assign/${id}`), input);
                setId(null);
                setInput({});
                setEdit(false);
            } catch (error) {
                console.error('Error updating document: ', error);
            }
        } else {
            if(assign.length >0){
                
                assign.map(async(item)=>{
                    if (item.username == input.username) { 
                        alert('User already assign')
                    }else if(item.pc == input.pc){
                    alert('Pc already assign')
                    }else{
                        try {
                            await push(ref(database, 'assign'), input);
                            setInput({});
                        } catch (error) {
                            console.error('Error adding document: ', error);
                        }
                    }
            })
            } else{
                try {
                  
                    await push(ref(database, 'assign'), input);
                    setInput({});
                } catch (error) {
                    console.error('Error adding document: ', error);
                }
            }           
        }
    };
    const handleDelete = async (id) => {
        try {
            await remove(ref(database, `assign/${id}`));
            setAssign((prevUser) => prevUser.filter((item) => item.id !== id));
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    }
    
    const handleEdit = async (selectedId) => {
        const userDoc = doc(db, 'assign', selectedId);
        const userRef = await getDoc(userDoc);
        const userData = userRef.data();
        setInput(userData);
        setId(selectedId);
        setEdit(true);
    };

    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                <select id="pcDropdown" name="pc" className="form-select mb-3" onChange={handleChange}>
                    <option value={input.pc || ''}>{input.pc || 'Select PC'}</option>
                    {pc.map((item) => (
                        <option key={item.id} value={item.name}>
                            {item.name}
                        </option>
                    ))}
                </select>
                <select id="userDropdown" name="username" className="form-select mb-3" onChange={handleChange}>
                    <option value={input.username || ''}>{input.username || 'Select User'}</option>
                    {user.map((item) => (
                        <option key={item.id} value={item.name}>
                            {item.name}
                        </option>
                    ))}
                </select>
                <button className="btn btn-primary mb-3">{edit ? 'Update' : 'Add'}</button>
            </form>
            <h1>Action</h1>
            <table className="table border-2">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th></th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {assign.map((item) => (
                        <tr key={item.id}>
                            <td>{item.username}</td>
                            <td>{item.pc}</td>
                            <td>
                                <button className='btn btn-warning me-1' onClick={() => handleEdit(item.id)}>Edit</button>
                                <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Assign;
