import React, { useEffect } from "react";
import { BsCheckSquareFill, BiSearch, MdSelectAll, BsFillTrash3Fill, GrClose, MdDeselect } from "../utils/icon";
import { useSelector, useDispatch } from "react-redux";
import { updateCheckbox } from "../features/onOffAddCatatan";
import { resetCheckeds, handleCekbox } from "../features/restApiCatatans";
import { toggleScrollLock } from "../features/lockScrollBody";

const BtnSelectSearch = ({ catatans, tipe, setActiveAlert }) => {
    const { activeChekbox } = useSelector(state => state.onOffFormCatatan);
    const { checkeds } = useSelector(state => state.catatan);
    const { isLockScroll } = useSelector(state => state.scrollLock)
    const dispatch = useDispatch();

    const deleteCatatanById = () => {
        if (checkeds.length !== 0) {
            setActiveAlert(true)
            dispatch(toggleScrollLock(true))
        }
    }

    useEffect(() => {
        const bodyStyle = document.body.style

        bodyStyle.overflowY = isLockScroll ? "hidden" : "auto"
    }, [isLockScroll])

    return (
        <>
            {!activeChekbox
                ? (
                    <div className="flex gap-4 items-center">
                        <BsCheckSquareFill
                            className="text-[1.4rem] sm:text-[1.5rem] cursor-pointer"
                            onClick={() => dispatch(updateCheckbox())}
                        />
                        <BiSearch className="text-[1.4rem] sm:text-[1.5rem] cursor-pointer" />
                    </div>
                )
                : (
                    <div className="flex gap-4 items-center">
                        <GrClose
                            className="text-[1.2rem] cursor-pointer absolute left-0 ml-5"
                            onClick={() => {
                                dispatch(updateCheckbox())
                                dispatch(resetCheckeds())
                            }}
                        />
                        <p className="text-[1.2rem] absolute left-0 ml-[3.5rem]">{checkeds.length}</p>

                        {catatans.length === checkeds.length
                            ? <MdDeselect
                                className="text-[1.7rem] cursor-pointer"
                                onClick={() => dispatch(handleCekbox({ selectAll: true, data: catatans }))}
                            />
                            : <MdSelectAll
                                className="text-[1.7rem] cursor-pointer"
                                onClick={() => dispatch(handleCekbox({ selectAll: true, data: catatans }))}
                            />
                        }
                        <BsFillTrash3Fill
                            className={checkeds.length !== 0 ? "text-[1.3rem] cursor-pointer" : "text-[1.3rem] cursor-pointer text-black/30"}
                            onClick={() => deleteCatatanById()}
                        />
                    </div>
                )
            }
        </>
    )
}

export default BtnSelectSearch