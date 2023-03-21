import React, { useCallback, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { IoIosArrowBack } from "../utils/icon";
import FromAddCatatan from "../components/FormAddCatatan";
import BtnAddCatatan from "./BtnAddCatatan";
import { getCatatan, deleteCatatan } from "../features/restApiCatatans";
import Catatans from "./Catatans";
import BtnSelectSearch from "./BtnSelectSearch";
import AlertRemoveCatatan from "./AlertRemoveCatatan";
import checkedsToId from "../utils/checkedsToId";

const IsiFolder = () => {
    const { dataFolder } = useSelector(state => state.folder);
    const { catatans, isSuccess, checkeds } = useSelector(state => state.catatan);
    const { user } = useSelector(state => state.loginRegis);
    const [activeAlert, setActiveAlert] = useState(false);
    const { activeChekbox } = useSelector(state => state.onOffFormCatatan);
    const [folders, setFolders] = useState([]);
    const [filCatatan, setFilCatatan] = useState([]);
    const { id } = useParams();
    const dispatch = useDispatch();

    // Filter Folder berdasarkan Id
    const filterById = useCallback(() => {
        let dataFilter = dataFolder.filter((data) => {
            return data.id === parseInt(id)
        })
        return setFolders(dataFilter);
    }, [dataFolder, id])

    // Filter Catatan Berdarakan Id Folder
    const filCatatanById = useCallback(() => {
        let data = catatans.filter((data) => {
            return data.folderId === parseInt(id)
        })
        return setFilCatatan(data)
    }, [catatans, id])

    useEffect(() => {
        // Filter
        filterById()
        // Filter Catatan Berdasarkan folder id
        filCatatanById()
        // Get Data Catatan
        if (isSuccess) dispatch(getCatatan({ userId: user[0].id }));
    }, [filterById, dispatch, isSuccess, user, filCatatanById])

    const onSubmitRemoveCatatan = () => {
        let data = checkedsToId(checkeds)
        dispatch(deleteCatatan(data))
    }

    return (
        <>
            <div className="container-app relative">
                <div className="font-medium text-black text-xl flex gap-4 items-center mt-3 justify-end pr-5">
                    {!activeChekbox && (
                        <div className="flex justify-start w-full items-center gap-3">
                            <NavLink
                                to={"/folder"}
                                className="cursor-pointer"
                            >
                                <IoIosArrowBack />
                            </NavLink>
                            {folders.map((data) => (
                                <React.Fragment key={data.id}>
                                    <h1>{data.nameFolder}</h1>
                                </React.Fragment>
                            ))}
                        </div>
                    )}
                    {filCatatan.length !== 0 && (
                        <BtnSelectSearch setActiveAlert={setActiveAlert} catatans={filCatatan} />
                    )}
                </div>

                <div className="mt-8">
                    <Catatans catatans={filCatatan} />
                </div>

                <BtnAddCatatan />
            </div>

            <FromAddCatatan folderId={id} />

            {activeAlert && (
                <AlertRemoveCatatan setActiveAlert={setActiveAlert} onSubmitRemoveCatatan={onSubmitRemoveCatatan} />
            )}
        </>

    )
}

export default IsiFolder