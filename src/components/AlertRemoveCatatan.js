import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleScrollLock } from "../features/lockScrollBody";
import { resetCheckeds } from "../features/restApiCatatans";
import { resetActiveChekbox } from "../features/onOffAddCatatan";

const AlertRemoveCatatan = ({ setActiveAlert, onSubmitRemoveCatatan }) => {
    const { catatans } = useSelector(state => state.catatan);
    const dispatch = useDispatch()

    const onSubmitBatal = () => {
        dispatch(toggleScrollLock(false))
        setActiveAlert(false)
    }

    return (
        <>
            <div className="bg-black/50 fixed left-0 top-0 w-full h-screen z-50 grid justify-items-center items-center">
                <div className="bg-white w-[20rem] h-[8rem] rounded-lg px-5 py-3">
                    <h3 className="font-semibold">
                        Are you sure you want to delete {catatans.length} notes?
                    </h3>
                    <div className="flex justify-end gap-6 mt-6 text-blue-500 font-semibold">
                        <button onClick={() => onSubmitBatal()}>Cancel</button>
                        <button onClick={() => {
                            onSubmitRemoveCatatan();
                            onSubmitBatal()
                            dispatch(resetCheckeds())
                            dispatch(resetActiveChekbox())
                        }}>Ok</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AlertRemoveCatatan