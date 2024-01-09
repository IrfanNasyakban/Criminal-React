/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FormAddCriminal = () => {

    const [nama, setnama] = useState("")
    const [gender, setgender] = useState("Laki-laki")
    const [tindakan, settindakan] = useState("")
    const [file, setfile] = useState("")
    const [preview, setpreview] = useState("")
    const navigate = useNavigate()

    const saveUser = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("nama", nama)
        formData.append("gender", gender)
        formData.append("tindakan", tindakan)
        formData.append("file", file)
        try {
            await axios.post('http://localhost:5000/users', formData, {
                headers:{
                    "Content-Type": "multipart/form-data"
                }
            })
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    const loadImage = (e) =>{
        const image = e.target.files[0]
        setfile(image)
        setpreview(URL.createObjectURL(image))
    }

    return (
        <div>
            <h1 className='title'>
                Criminals
            </h1>
            <h2 className='subtitle'>
                Add New Criminal
            </h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={saveUser}>
                            <div className='field'>
                                <label className='label'>Nama</label>
                                <div className='control'>
                                    <input type="text" className='input' value={nama} onChange={(e) => setnama(e.target.value)} placeholder='Nama'></input>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Gender</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select value={gender} onChange={(e) => setgender(e.target.value)}>
                                            <option value="laki-laki">Laki-Laki</option>
                                            <option value="perempuan">Perempuan</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Tindakan</label>
                                <div className="control">
                                    <input type="text" className="input" value={tindakan} onChange={(e) => settindakan(e.target.value)} placeholder='Tindakan' />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Image</label>
                                <div className="control">
                                    <div className="file">
                                        <label className="file-label">
                                            <input type="file" className='file-input' onChange={loadImage}/>
                                            <span className='file-cta'>
                                                <span className='file-label'>Choose a file...</span>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className='field'>
                                <div className="control">
                                    <button className='button is-success'>Save</button>
                                </div>
                            </div>
                            <h3>Preview</h3>
                            {preview ? (
                                <figure>
                                    <img src={preview} style={{width:'40%'}} alt="Preview Image" />
                                </figure>
                            ) : (
                                ""
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormAddCriminal