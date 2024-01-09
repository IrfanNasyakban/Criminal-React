/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoPerson, IoHome, IoLogOut } from "react-icons/io5"
import { MdOutlinePolicy } from "react-icons/md"

const Sidebar = () => {
    return (
        <div>
            <aside className="menu pl-2 has-shadow">
                <p className="menu-label">
                    General
                </p>
                <ul className="menu-list">
                    <li><NavLink to={"/dashboard"}><IoHome/>Dashboard</NavLink></li>
                    <li><NavLink to={"/criminal"}><MdOutlinePolicy/>Criminal</NavLink></li>
                </ul>
                <p className="menu-label">
                    Admin
                </p>
                <ul className="menu-list">
                    <li><NavLink to={"/users"}><IoPerson/>User</NavLink></li>
                    
                </ul>
                <p className="menu-label">
                    Setting
                </p>
                <ul className="menu-list">
                    <li><button className='button is-white'><IoLogOut/>Logout</button></li>
                </ul>
            </aside>
        </div>
    )
}

export default Sidebar