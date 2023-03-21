import React from 'react'
import { NavLink } from 'react-router-dom'

const NotFound = () => {
    return (
        <>
            <div className="container-app text-center py-14">
                <h1 className="text-4xl font-medium">Ups, halaman itu hilang</h1>
                <p className="text-404 mb-[2rem]">404</p>
                <NavLink to={"loginregis"} className=" bg-gray-400 transition-all duration-300 py-1 px-3 text-white rounded-md hover:bg-color-primary">Back</NavLink>
            </div>
        </>
    )
}

export default NotFound