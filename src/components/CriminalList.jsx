import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

function CriminalList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getUsers();
  }, [page, keyword]);

  const getUsers = async () => {
    const response = await axios.get(
      `http://localhost:5000/users?search_query=${keyword}&page=${page}&limit=${limit}`
    );
    setUsers(response.data.result);
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);
  };
  const deleteCriminal = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    getUsers();
  };

  const changePage = ({ selected }) => {
    setPage(selected);
    if (selected === 9) {
      setMsg(
        "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
      );
    } else {
      setMsg("");
    }
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setMsg("");
    setKeyword(query);
  };

  return (
    <div className="container mt-5">
      <div className="colums">
        <div className="column is-centered">
          <h1 className="title">Criminals</h1>
          <h2 className="subtitle">List of Criminal</h2>
          <Link to="/criminal/add" className="button is-primary mb-2">
            Add New
          </Link>
          <form onSubmit={searchData} className="mb-3">
            <div className="field has-addons">
              <div className="control is-expanded">
                <input
                  type="text"
                  className="input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari Nama Criminal"
                />
              </div>
              <div className="control">
                <button type="submit" className="button is-info">
                  Search
                </button>
              </div>
            </div>
          </form>
          <table className="table is-striped is-fullwidth">
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
                <tr key={user.uuid}>
                  <td>{index + 1}</td>
                  <td>{user.nama}</td>
                  <td>{user.gender}</td>
                  <td>{user.tindakan}</td>
                  <td><a href={user.url} target="_blank">Bukti</a></td>
                  <td>
                    <Link
                      to={`/criminal/edit/${user.uuid}`}
                      className="button is-small is-info"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteCriminal(user.uuid)}
                      className="button is-small is-danger"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
          </p>
          <p className="has-text-centered has-text-danger">{msg}</p>
          <nav
            className="pagination is-centered"
            key={rows}
            role="navigation"
            aria-label="pagination"
          >
            <ReactPaginate
              previousLabel={"< Prev"}
              nextLabel={"Next >"}
              pageCount={Math.min(10, pages)}
              onPageChange={changePage}
              containerClassName={"pagination-list"}
              pageLinkClassName={"pagination-link"}
              previousLinkClassName={"pagination-previous"}
              nextLinkClassName={"pagination-next"}
              activeLinkClassName={"pagination-link is-current"}
              disabledLinkClassName={"pagination-link is-disabled"}
            />
          </nav>
        </div>
      </div>
    </div>
  );
}

export default CriminalList;
