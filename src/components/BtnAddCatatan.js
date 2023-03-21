import { React } from "react";
import { BiPlus } from "../utils/icon";
import { onOffCatatan, hiddenForm } from "../features/onOffAddCatatan";
import { useDispatch } from "react-redux";

const BtnAddCatatan = () => {
    const dispatch = useDispatch();

    const showForm = (value) => {
        dispatch(hiddenForm())
        setTimeout(() => {
            dispatch(onOffCatatan(value))
        }, 100);
    }

    return (
        <>
            <div className="fixed bottom-0 z-0 w-full sm:w-auto">
                <div className="container-app flex justify-end px-5">
                    <button
                        className="bg-color-primary text-white rounded-full p-2 relative top-[-5rem]"
                        onClick={() => showForm(true)}
                    >
                        <BiPlus className="text-2xl" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default BtnAddCatatan