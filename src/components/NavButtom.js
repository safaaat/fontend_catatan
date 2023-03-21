import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { GiPostOffice, AiFillFolderOpen } from "../utils/icon";
import { resetCheckeds } from "../features/restApiCatatans";
import { resetActiveChekbox } from "../features/onOffAddCatatan";
import { useDispatch } from "react-redux";

const NavButtom = () => {
    const dispatch = useDispatch();

    return (
        <>

            <div className="fixed bg-white z-10 py-2 bottom-0 w-full sm:w-auto">
                <div className="container-app grid grid-cols-2">
                    <div className="grid justify-items-center text-lg capitalize">
                        <NavLink
                            to={"/"}
                            className={({ isActive }) => (isActive
                                ? "text-color-primary"
                                : "text-black"
                            )}
                            onClick={() => {
                                dispatch(resetCheckeds())
                                dispatch(resetActiveChekbox())
                            }}
                        >
                            <GiPostOffice className="text-xl mx-auto" />
                            <p>Home page</p>
                        </NavLink>
                    </div>
                    <div className="grid justify-items-center">
                        <NavLink
                            to={"/folder"}
                            className={({ isActive }) => (isActive
                                ? "text-color-primary text-lg capitalize"
                                : "text-black text-lg capitalize"
                            )}
                            onClick={() => {
                                dispatch(resetCheckeds())
                                dispatch(resetActiveChekbox())
                            }}
                        >
                            <AiFillFolderOpen className="text-xl mx-auto" />
                            <span>Folder</span>
                        </NavLink>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default NavButtom