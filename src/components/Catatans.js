import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCatatan, handleCekbox, resetMessage } from "../features/restApiCatatans";
import { hiddenForm, onOffCatatan, updateUser } from "../features/onOffAddCatatan";

const Catatans = ({ catatans }) => {
    const { user } = useSelector(state => state.loginRegis);
    const { activeChekbox } = useSelector(state => state.onOffFormCatatan);
    const { checkeds, message } = useSelector(state => state.catatan);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user || message) {
            let userId = user[0].id
            dispatch(getCatatan({ userId }));
            dispatch(resetMessage());
        }
    }, [dispatch, user, message])

    const contain = (data) => {
        if (data.judul) return <p className="text-xs text-gray-500 mt-1 mb-[2px]">{data.contain}</p>
        return <h3 className="font-medium mb-1">{data.contain}</h3>
    }

    const showForm = (data) => {
        dispatch(updateUser(data))

        dispatch(hiddenForm())
        setTimeout(() => {
            dispatch(onOffCatatan(true))
        }, 100);
    }

    return (
        <>
            <div className="px-5 py-3">
                {catatans.length !== 0 && catatans
                    ? (
                        <div className="grid gap-2 h-auto">
                            {catatans.map((data) => (
                                <div key={data.id} className="relative">
                                    <div className={activeChekbox ? "parent_checkbox z-[1]" : "parent_checkbox"}>
                                        <input
                                            type="checkbox"
                                            value={data}
                                            className="cursor-pointer before:absolute before:w-full before:h-full before:bg-transparent before:rounded-lg before:top-0 before:left-[0]"
                                            name={data.judul}
                                            checked={checkeds.indexOf(data) === -1 ? false : true}
                                            onChange={() => dispatch(handleCekbox(data))}
                                        />
                                    </div>
                                    <div
                                        className={activeChekbox ? "box-catatan ml-8" : "box-catatan"}
                                        onClick={() => showForm(data)}
                                    >
                                        <h3 className="font-medium">{data.judul}</h3>
                                        {contain(data)}
                                        <p className="text-[10px] text-gray-500">{data.updateDate}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                    : (
                        <div className="flex flex-col items-center justify-center w-full py-8">
                            <img
                                src={process.env.PUBLIC_URL + "/img-empty.png"}
                                alt="img-empty"
                                className="w-[20rem]"
                            />
                            <p className="font-medium text-gray-400 mt-2">No note</p>
                        </div>
                    )
                }

            </div>
        </>
    )
}

export default Catatans