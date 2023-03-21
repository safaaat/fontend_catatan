import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFolder } from "../features/restApiFolder";
import { resetCheckeds } from "../features/restApiCatatans";
import { resetActiveChekbox } from "../features/onOffAddCatatan";
import filterCatatanByFolder from "../utils/filterCatatanByFolder";
import { deleteCatatan } from "../features/restApiCatatans";
import { toggleScrollLock } from "../features/lockScrollBody";

const AlertRemoveFolder = ({ activeAlert, setActiveAlert }) => {
    const { checkeds } = useSelector(state => state.catatan);
    const { catatans } = useSelector(state => state.catatan)
    const [filterCatatan, setFilterCatatan] = useState([]);
    const dispatch = useDispatch();

    const onSubmitRemoveFolder = () => {
        dispatch(removeFolder(checkeds))
        dispatch(resetCheckeds())
        setActiveAlert(false)
        dispatch(resetActiveChekbox())
    }

    useEffect(() => {
        if (activeAlert === true) setFilterCatatan(filterCatatanByFolder(checkeds, catatans))
    }, [activeAlert, checkeds, catatans])

    const removeFolderAndMome = () => {
        dispatch(deleteCatatan(filterCatatan))
        onSubmitRemoveFolder()
    }

    return (
        <>
            <div className="bg-black/50 fixed left-0 top-0 w-full h-screen z-50 grid justify-items-center items-center">
                <div className="bg-white w-[20rem] h-[20rem] rounded-lg px-5 py-3">
                    <h3 className="font-semibold">
                        Anda yakin ingin menghapus {checkeds.length} folder ini?
                    </h3>
                    {filterCatatan.length !== 0
                        ? (
                            <p className="text-center mt-6">
                                Jika anda hanya ingin menghapus folder, konten didalam folder tersebut akan di pertahankan
                            </p>
                        )
                        : (
                            <p className="text-center mt-6">
                                Folder yang anda ingin hapus tidak memiliki catatan
                            </p>
                        )
                    }

                    <div className="grid text-blue-500 font-medium mt-9 gap-5">
                        {filterCatatan.length !== 0
                            ? (
                                <div className="grid gap-5">
                                    <button onClick={() => {
                                        removeFolderAndMome()
                                        dispatch(toggleScrollLock(false))
                                    }}>
                                        Hapus Folder Dan Catatan
                                    </button>
                                    <button onClick={() => {
                                        onSubmitRemoveFolder()
                                        dispatch(toggleScrollLock(false))
                                    }}>
                                        Hapus Saja Foldernya
                                    </button>
                                </div>
                            )
                            : (
                                <div className="grid mt-10">
                                    <button onClick={() => {
                                        onSubmitRemoveFolder()
                                        dispatch(toggleScrollLock(false))
                                    }}>
                                        Hapus Folder
                                    </button>
                                </div>
                            )}

                        <button onClick={() => {
                            setActiveAlert(false)
                            dispatch(toggleScrollLock(false))
                        }}>
                            Batal</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AlertRemoveFolder