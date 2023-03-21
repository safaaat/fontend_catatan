import React, { useState, useEffect, useCallback } from "react";
import { FaPencilAlt, FaUserCircle } from "../utils/icon";
import useOnScroll from "../hook/useOnScroll";
import { useDispatch } from "react-redux";
import { reset } from "../features/restApiLoginRegister";
import BtnSelectSearch from "./BtnSelectSearch";
import { useSelector } from "react-redux";

const NavTop = ({ data, setActiveAlert }) => {
    const { activeChekbox } = useSelector(state => state.onOffFormCatatan);
    const [catatan, icon, fontSizes, opacitys] = useOnScroll(activeChekbox)
    const [active, setActive] = useState(false);
    const dispatch = useDispatch();

    const classOpacitys = useCallback(() => {
        if (activeChekbox) return `parent_icon-home-active z-[100]`
        return "parent_icon-home-active z-[1]"
    }, [activeChekbox])

    const classIcon = useCallback(() => {
        if (activeChekbox) return "parent_icon-home z-50"
        return "parent_icon-home z-0"
    }, [activeChekbox])

    useEffect(() => {
        classIcon()
        classOpacitys()
    }, [classOpacitys, classIcon])

    return (
        <>
            <div className="relative bg-white w-full h-[6rem] 360:h-[7rem] sm:h-[9rem]">
                <div className={!catatan ? "parent_judul" : "parent_judul-active"}>
                    <div className="flex items-center mt-[-.3rem] 360:mt-[-.2rem] 500:mt-[-.4rem] sm:mt-[-3px] px-5 gap-2 font-medium relative">
                        <FaPencilAlt
                            style={{
                                fontSize: `${fontSizes - 10}px`,
                                opacity: opacitys
                            }} />
                        <h1
                            style={{
                                fontSize: `${fontSizes}px`,
                                opacity: opacitys
                            }}
                        >
                            Catatans
                        </h1>
                    </div>
                </div>
                <div className={!icon ? `${classIcon()}` : `${classOpacitys()}`}>
                    <div className="container-app flex justify-end items-center gap-4 py-3 px-5 relative w-full">
                        {data.length !== 0 && (
                            <BtnSelectSearch catatans={data} setActiveAlert={setActiveAlert} />
                        )}
                        <FaUserCircle
                            className="text-[1.4rem] sm:text-[1.5rem] cursor-pointer"
                            onClick={() => setActive((state) => !state)}
                        />
                    </div>
                </div>
                {active && (
                    /* Logout */
                    <div div className={!icon ? "btn_logout" : "btn_logout_active"} >
                        <div className={"container-app flex justify-end px-5 relative"}>
                            <button
                                className={!icon ? "bg-black text-white rounded-md py-1 px-3 font-medium relative top-1" : "bg-black text-white rounded-md py-1 px-3 font-medium relative top-[3.5rem]"}
                                onClick={() => dispatch(reset())}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default NavTop