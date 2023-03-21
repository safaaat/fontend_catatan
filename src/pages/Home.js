import React, { useEffect, useState } from "react";
import Catatans from "../components/Catatans";
import FormAddCatatan from "../components/FormAddCatatan";
import NavButtom from "../components/NavButtom";
import NavTop from "../components/NavTop";
import BtnAddCatatan from "../components/BtnAddCatatan";
import { useSelector, useDispatch } from "react-redux";
import AlertRemoveCatatan from "../components/AlertRemoveCatatan";
import checkedsToId from "../utils/checkedsToId";
import { deleteCatatan, getCatatan, resetSuccess } from "../features/restApiCatatans";

const Home = () => {
    const { user } = useSelector(state => state.loginRegis)
    const { active } = useSelector(state => state.onOffFormCatatan);
    const { checkeds, catatans, isSuccess } = useSelector(state => state.catatan);
    const [hiddenHome, setHiddenHome] = useState(false);


    const [activeAlert, setActiveAlert] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (active === true) {
            setTimeout(() => {
                setHiddenHome(active);
            }, 800);
        }
        if (active === false) return setHiddenHome(active);
    }, [active]);

    const onSubmitRemoveCatatan = () => {
        let data = checkedsToId(checkeds)
        dispatch(deleteCatatan(data))
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(getCatatan({ userId: user[0].id }));
            dispatch(resetSuccess());
            setActiveAlert(false);
        }
    }, [isSuccess, dispatch, user])

    return (
        <>
            {!hiddenHome && (
                <div className="container-app relative">
                    <NavTop data={catatans} setActiveAlert={setActiveAlert} />
                    <div className="w-full mb-[4rem]">
                        <Catatans catatans={catatans} />
                    </div>
                    <BtnAddCatatan />
                    <NavButtom />
                </div>
            )}

            {activeAlert && (
                <AlertRemoveCatatan setActiveAlert={setActiveAlert} onSubmitRemoveCatatan={onSubmitRemoveCatatan} />
            )}

            <FormAddCatatan />
        </>
    )
}

export default Home