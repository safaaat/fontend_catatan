import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePas, updateConf, updateRegisSign } from '../features/formRegisLogin';
import { reset } from '../features/restApiLoginRegister';

const BtnSignRegis = () => {
    const { regisSign } = useSelector(state => state.formRegisLogin);
    const dispatch = useDispatch();

    return (
        <>
            <div className="dimensi-form mx-auto">
                <div className='grid grid-cols-2 bg-white rounded-lg'>
                    <button
                        className={regisSign === "register" ? 'btn_regis-sign bg-color-primary text-white' : 'btn_regis-sign'}
                        onClick={() => {
                            dispatch(updateRegisSign("register"))
                            dispatch(updatePas(false))
                            dispatch(updateConf(false))
                            dispatch(reset())
                        }}
                    >
                        Register
                    </button>
                    <button
                        className={regisSign === "sign in" ? 'btn_regis-sign bg-color-primary text-white' : 'btn_regis-sign'}
                        onClick={() => {
                            dispatch(updateRegisSign("sign in"))
                            dispatch(updatePas(false))
                            dispatch(updateConf(false))
                            dispatch(reset())
                        }}
                    >
                        Sign in
                    </button>
                </div>
            </div >
        </>
    )
}

export default BtnSignRegis