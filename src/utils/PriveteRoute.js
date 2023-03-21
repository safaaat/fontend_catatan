import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PriveteRoute = () => {
    const { user } = useSelector(state => state.loginRegis);

    return (
        user ? <Outlet /> : <Navigate to={"loginregis"} />
    )
}

export default PriveteRoute