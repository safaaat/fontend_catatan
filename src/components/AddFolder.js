import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postFolder } from "../features/restApiFolder";
import { updateActive } from "../features/onOffAddFolder";


const AddFolder = () => {
    const [input, setInput] = useState("Folder baru");
    const { user } = useSelector(state => state.loginRegis);
    const { active } = useSelector(state => state.onOffAddFolder);
    const { isSuccess } = useSelector(state => state.folder);
    const dispatch = useDispatch()

    const newFolder = () => {
        if (input.length !== 0) {
            dispatch(postFolder({ userId: user[0].id, nameFolder: input }));
        }
    }

    useEffect(() => {
        // Ketika berhasil membuat folder, Close form AddFolder
        if (isSuccess) {
            dispatch(updateActive(false));
        }
    }, [isSuccess, dispatch])

    return (
        <>
            {active && (
                <div className="bg-black/50 fixed top-0 z-50 left-0 w-full h-screen grid justify-items-center items-center">
                    <div className="bg-white p-5 w-[20rem] rounded-xl">
                        <h1>Folder baru</h1>
                        <input
                            type="text"
                            className="my-4 w-full focus:outline-none border-b-2 border-color-primary"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <div className="flex gap-7 justify-end font-medium">
                            <button
                                className="hover:text-red-400"
                                onClick={() => dispatch(updateActive())}
                            >Batal</button>
                            <button
                                className={input.length === 0 ? "text-gray-300 cursor-not-allowed" : "text-color-primary"}
                                onClick={() => newFolder()}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default AddFolder