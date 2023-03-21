import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BtnSignRegis from '../components/BtnSignRegis';
import Login from '../components/Login';
import Register from '../components/Register';

const FormLoginOrRegis = () => {
    const [resize, setResize] = useState("");
    const { regisSign } = useSelector(state => state.formRegisLogin);

    useEffect(() => {
        const onResize = () => {
            if (window.innerHeight) {
                setResize(window.innerHeight)
            }
        }
        onResize()
    }, [])

    const classContainer = () => {
        if (resize < 500) return "container-app bg-gray-200 pt-5 pb-10 h-auto relative"
        return "container-app bg-gray-200 py-5 h-auto 360:h-screen relative"
    }

    return (
        <>
            <div className={classContainer()}>
                <div className="grid h-full">
                    {regisSign === "sign in"
                        ? <Login />
                        : <Register />
                    }
                    <div className={regisSign === "sign in" ? "mt-[5rem]" : ""}>
                        <BtnSignRegis />
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormLoginOrRegis