import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

function CriminalList() {
    const [user, setUser] = useState([])

    useEffect(()=>{
        getCriminals()
    },[])

    const getCriminals = async ()=> {
        const response = await axios.get('http://localhost:5000/users')
        setUser(response.data)
    }
    const deleteCriminal = async (userId) =>{
        await axios.delete(`http://localhost:5000/users/${userId}`)
        getCriminals()
    }

    return (
        <div>
            <h1 className='title'>
                Criminals
            </h1>
            <h2 className='subtitle'>
                List of Criminal
            </h2>
            <Link to="/users/add" className='button is-primary mb-2'>Add New</Link>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Gender</th>
                        <th>Tindakan</th>
                        <th>Bukti</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((user, index) => (
                        <tr key={user.uuid}>
                        <td>{index + 1}</td>
                        <td>{user.nama}</td>
                        <td>{user.gender}</td>
                        <td>{user.tindakan}</td>
                        <td><a href="" target="_blank" rel="">Bukti</a></td>
                        <td>
                            <Link to={`/user/edit/${user.uuid}`} className='button is-small is-info'>Edit</Link>
                            <button onClick={()=> deleteCriminal(user.uuid)} className='button is-small is-danger'>Hapus</button>
                        </td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    )
}

export default CriminalList
