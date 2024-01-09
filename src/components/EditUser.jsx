/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditUser = () => {
const [nama, setnama] = useState("")
const [gender, setgender] = useState("Laki-laki")
const [tindakan, settindakan] = useState("")
const [file, setfile] = useState("")
const [preview, setpreview] = useState("")
const navigate = useNavigate()
const {id} = useParams()

useEffect(()=>{
    getUserById();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[]);

const updateUser = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("nama", nama)
    formData.append("gender", gender)
    formData.append("tindakan", tindakan)
    formData.append("file", file)
    try {
        await axios.patch(`http://localhost:5000/users/${id}`, formData, {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        })
        navigate("/")
    } catch (error) {
        console.log(error);
    }
}

const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/users/${id}`)
    setnama(response.data.nama)
    setgender(response.data.gender)
    settindakan(response.data.tindakan)
    setfile(response.data.image)
    setpreview(response.data.url)
}

const loadImage = (e) =>{
    const image = e.target.files[0]
    setfile(image)
    setpreview(URL.createObjectURL(image))
}
  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <form onSubmit={updateUser}>
                <div className="field">
                    <label className="label">Nama</label>
                    <div className="control">
                        <input type="text" className="input" value={nama} onChange={(e) => setnama(e.target.value)} placeholder='Nama'/>
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
                        <input type="text" className="input" value={tindakan} onChange={(e) => settindakan(e.target.value)} placeholder='Tindakan'/>
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
                <div className="field">
                    <button type='submit' className='button is-success'>Update</button>
                </div>
                {preview ? (
                    <figure className='image is-fullwidth'>
                        <img src={preview} alt="Preview Image"/>
                    </figure>
                ): (
                    ""
                )}
            </form>
        </div>
    </div>
  )
}

export default EditUser