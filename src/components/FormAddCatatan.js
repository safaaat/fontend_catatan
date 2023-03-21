import React, { useCallback, useEffect, useState } from "react";
import { IoIosArrowBack, AiOutlineCheck } from "../utils/icon";
import { useSelector, useDispatch } from "react-redux";
import { onOffCatatan, hiddenForm, resetUser } from "../features/onOffAddCatatan";
import { resetSuccess, postCatatan, updateCatatan } from "../features/restApiCatatans";
import confertDate from "../utils/confertDate";

const FormAddCatatan = ({ folderId }) => {
    const [height, setHeight] = useState();
    const { user } = useSelector(state => state.loginRegis)
    const [input, setInput] = useState({ userId: null, judul: "", contain: "", folderId: null, createdDate: "", updateDate: "" });
    const [currentTime, setCurrentTime] = useState();
    const { active, hidden, currentUser } = useSelector(state => state.onOffFormCatatan);
    const { isSuccess } = useSelector(state => state.catatan)

    const dispatch = useDispatch();

    useEffect(() => {
        let textArea = document.querySelector(".add-catatan_textarea");

        if (textArea !== null) {
            textArea.addEventListener("keyup", e => {
                let scHeight = e.target.scrollHeight;
                setHeight(scHeight)
            })
        }
    }, [input.contain]);

    const onClick = useCallback((value) => {
        dispatch(resetUser())
        dispatch(onOffCatatan(value))
        setTimeout(() => {
            dispatch(hiddenForm())
        }, 900);
        setHeight(59);
        updateInput({ judul: "", contain: "", createdDate: "", updateDate: "" })
    }, [dispatch])

    const updateInput = (value) => {
        setInput((prev) => {
            return { ...prev, ...value }
        })
    }

    useEffect(() => {
        updateInput({ userId: user[0].id })

        if (!active) {
            let time = new Date().getTime();
            let hasil = confertDate(time);
            setCurrentTime(hasil);
        }

        // Close Form
        if (isSuccess === true) {
            onClick(false)
            dispatch(resetSuccess())
        }

        if (currentUser.length !== 0) updateInput(currentUser)
        updateInput({ createdDate: currentTime, updateDate: currentTime })
    }, [active, user.id, currentTime, user, dispatch, isSuccess, onClick, currentUser]);

    const onSubmitAddCatatan = () => {
        if (input.contain) {
            if (currentUser.length === 0) return dispatch(postCatatan(input))
            return dispatch(updateCatatan(input));
        }
    }

    // Jika Add Catatan Melalui folder, kirimkan folder ke input Objek
    useEffect(() => {
        if (folderId !== undefined) return updateInput({ folderId: folderId })
    }, [folderId])

    return (
        <>
            {hidden && (
                <div className={!active
                    ? "parent_form-add-catatan_active overflow-hidden"
                    : "parent_form-add-catatan"
                }>
                    <div className={!active
                        ? "container-app bg-white h-full rounded-t-3xl transition-all duration-300 px-5 translate-y-[1000px]"
                        : "container-app bg-white h-full rounded-t-3xl transition-all duration-300 px-5 translate-y-[0px]"
                    }>
                        <div className="flex justify-between py-3 text-2xl">
                            <button onClick={() => onClick(false)}>
                                <IoIosArrowBack />
                            </button>
                            <button>
                                <AiOutlineCheck
                                    className={!input.contain ? "text-color-primary/20 cursor-not-allowed" : "text-color-primary"}
                                    onClick={() => onSubmitAddCatatan()}
                                />
                            </button>
                        </div>

                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder="Judul"
                                className="focus:outline-none px-2 w-full font-medium"
                                value={input.judul}
                                onChange={(input) => updateInput({ judul: input.target.value })}
                            />
                            <p className="text-xs px-2 mt-2 font-light text-gray-300">{currentTime}</p>
                            <textarea
                                className="add-catatan_textarea"
                                placeholder="type something here..."
                                style={{ height: `${height}px` }}
                                value={input.contain}
                                onChange={(input) => updateInput({ contain: input.target.value })}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default FormAddCatatan