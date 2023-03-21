import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiFillFolder } from "../utils/icon";
import { handleCekbox } from "../features/restApiCatatans";

const DisplayFolder = () => {
    const { dataFolder } = useSelector(state => state.folder);
    const { checkeds } = useSelector(state => state.catatan);
    const { activeChekbox } = useSelector(state => state.onOffFormCatatan);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <>
            <div className="container-app px-5">
                <div className="grid gap-5">
                    {dataFolder.map((data) => (
                        <div key={data.id} className="relative flex items-center">
                            <input
                                type="checkbox"
                                value={data}
                                className="absolute mx-1 cursor-pointer"
                                name={data.judul}
                                checked={checkeds.indexOf(data) === -1 ? false : true}
                                onChange={() => dispatch(handleCekbox(data))}
                            />
                            <div
                                className={activeChekbox ? "box-folder ml-8" : "box-folder"}
                                onClick={() => navigate(`isi-folder/${data.id}`)}
                            >
                                <AiFillFolder className="text-orange-300 text-xl" />
                                <h1>{data.nameFolder}</h1>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>

    )
}

export default DisplayFolder