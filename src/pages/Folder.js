import React, { useCallback, useEffect, useState } from "react";
import NavButtom from "../components/NavButtom";
import NavTop from "../components/NavTop";
import { useSelector, useDispatch } from "react-redux";
import { BiPlus } from "../utils/icon";
import DisplayFolder from "../components/DisplayFolder";
import { updateActive } from "../features/onOffAddFolder";
import AddFolder from "../components/AddFolder";
import { getFolder, resetSuccess } from "../features/restApiFolder";
import AlertRemoveFolder from "../components/AlertRemoveFolder";
import LoadingFolder from "../components/LoadingFolder";

const Folder = () => {
    const { dataFolder, isLoading } = useSelector(state => state.folder);
    const { user } = useSelector(state => state.loginRegis);
    const { isSuccess } = useSelector(state => state.folder);
    const [activeAlert, setActiveAlert] = useState(false);
    const dispatch = useDispatch();

    const callApiFolder = useCallback(() => {
        dispatch(getFolder({ userId: user[0].id }));
        dispatch(resetSuccess());
    }, [dispatch, user])

    useEffect(() => {
        if (isSuccess) {
            callApiFolder()
        }

        callApiFolder()
    }, [isSuccess, callApiFolder])

    return (
        <>
            <div className="container-app relative">
                <NavTop data={dataFolder} tipe={"folder"} setActiveAlert={setActiveAlert} />
                {isLoading && dataFolder.length === 0
                    ? <LoadingFolder />
                    : <>
                        {dataFolder.length === 0
                            ? (
                                <div className="w-full">
                                    <div className="flex flex-col items-center justify-center w-full py-8">
                                        <img
                                            src={process.env.PUBLIC_URL + "/img-empty.png"}
                                            alt="img-empty"
                                            className="w-[20rem]"
                                        />
                                        <p className="font-medium text-gray-400 mt-2">No Folder</p>
                                    </div>
                                </div>
                            )
                            : <DisplayFolder />
                        }
                    </>
                }

                <div className="fixed bottom-0 z-10 w-full sm:w-auto ">
                    <div className="container-app flex justify-end px-5">
                        <button
                            className="bg-color-primary text-white rounded-full p-2 relative top-[-5rem]"
                            onClick={() => dispatch(updateActive(true))}
                        >
                            <BiPlus className="text-2xl" />
                        </button>
                    </div>
                </div>

                <AddFolder />
                <NavButtom />
            </div>

            {/* Alert Remove Folder */}
            {activeAlert && (
                <AlertRemoveFolder setActiveAlert={setActiveAlert} activeAlert={activeAlert} />
            )}
        </>
    )
}

export default Folder