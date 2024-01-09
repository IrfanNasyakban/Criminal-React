/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate"

const UserList = () => {

    const [users, setUser] = useState([])
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [pages, setPages] = useState(0)
    const [rows, setRows] = useState(0)
    const [keyword, setKeyword] = useState("")
    const [query, setQuery] = useState("")
    const [msg, setMsg] = useState("")

    useEffect(() => {
        getUsers()
    }, [page, keyword])

    const getUsers = async () => {
        const response = await axios.get(
            `http://localhost:5000/users?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        setUser(response.data.result)
        setPage(response.data.page)
        setPages(response.data.totalPage)
        setRows(response.data.totalRows)
    }

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/users/${id}`)
            getUsers()
        } catch (error) {
            console.log(error);
        }
    }

    const changePage = ({selected}) => {
        setPage(selected)
        if (selected === 1){
            setMsg("Jika tidak menemukan data yang anda cari, silahkan cari data dengan kata kunci spesifik")
        } else {
            setMsg("")
        }
    }

    const searchData = (e) =>{
        e.preventDefault()
        setPage(0)
        setKeyword(query)
    }

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={searchData}>
                    <div className='field has-addons'>
                        <div className='control is-expanded'>
                            <input type="text" className='input' value={query} onChange={(e)=> setQuery(e.target.value)} placeholder='Cari' />
                        </div>
                        <div className='control'>
                            <button type='submit' className='button is-info'>
                                Search
                            </button>
                        </div>
                    </div>
                </form>
                <br/>
                <Link to={`tambah`} className="button is-success">
                    Tambah
                </Link>
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
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.nama}</td>
                                <td>{user.gender}</td>
                                <td>{user.tindakan}</td>
                                <td>
                                    <a href={user.url} target="_blank" rel="">Bukti</a>
                                </td>
                                <td>
                                    <Link to={`edit/${user.id}`} className='button is-small is-info'>Edit</Link>
                                    <button onClick={()=> deleteUser(user.id)} className='button is-small is-danger'>Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p>Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}</p>
                <p className='has-text-centered has-text-danger'>{msg}</p>
                <nav className="pagination is-centered" key={rows} role="navigation" aria-label="pagination">
                    <ReactPaginate
                        previousLabel={"< Prev"}
                        nextLabel={"Next >"}
                        pageCount={Math.min(10, pages)}
                        onPageChange={changePage}
                        containerClassName={"pagination-list"}
                        pageLinkClassName={"pagination-link"}
                        previousLinkClassName={"pagination-link-previous"}
                        nextLinkClassName={"pagination-link-next"}
                        activeLinkClassName={"pagination-link is-current"}
                        disabledLinkClassName={"pagination-link is-disabled"}
                    />
                </nav>
            </div>
        </div>
    )
}

export default UserList