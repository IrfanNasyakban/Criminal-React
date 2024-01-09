import React from 'react'

function CriminalList() {
    return (
        <div>
            <h1 className='title'>
                Criminals
            </h1>
            <h2 className='subtitle'>
                List of Criminal
            </h2>
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
                    <tr>
                        <td>1</td>
                        <td>Irvan</td>
                        <td>Laki-Laki</td>
                        <td>Mencuri</td>
                        <td><a href="" target="_blank" rel="">Bukti</a></td>
                        <td>
                            <button className='button is-small is-info'>Edit</button>
                            <button className='button is-small is-danger'>Hapus</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default CriminalList
