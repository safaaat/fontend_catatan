import React, { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from '../utils/icon';
import { useSelector, useDispatch } from 'react-redux';
import { updatePas } from '../features/formRegisLogin';
import { LoginUser } from '../features/restApiLoginRegister';
import { useNavigate } from "react-router-dom";
import classValidasiForm from '../utils/classValidasiForm';
import Loading from './Loading';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { booleanPas } = useSelector(state => state.formRegisLogin);
    const { user, isSuccess, message, isLoading } = useSelector(state => state.loginRegis)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmitForm = (event) => {
        event.preventDefault();
        if (email && password) return dispatch(LoginUser({ email, password }))
    }

    const classParagraph = (tipe) => {
        if (tipe === "email") {
            if (message.email !== undefined && !email) return "parent_text-input group-focus-within:text-red-400"
            if (message.email !== undefined) return classValidasiForm("paragraph", "email", message)
            if (email) return "text-input_active text-color-primary"
            return "parent_text-input text-color-primary"
        }
        if (tipe === "password") {
            if (message.password !== undefined && !password) return "parent_text-input group-focus-within:text-red-400"
            if (message.password !== undefined) return classValidasiForm("paragraph", "password", message)
            if (password) return "text-input_active text-color-primary"
            return "parent_text-input text-color-primary"
        }
    }

    useEffect(() => {
        if (user && isSuccess) {
            navigate("/");
        }

    }, [user, isSuccess, navigate])

    return (
        <>
            {isLoading && (
                <Loading />
            )}

            <div className='flex flex-col justify-center items-center'>
                <h1 className="font-bold text-3xl">Hello again!</h1>
                <h3 className="mt-2">Welcome back you've been missed</h3>
                <form onSubmit={onSubmitForm} className="dimensi-form mt-12">
                    <div className='grid gap-8'>
                        <div className="parent_input group">
                            <div className={classParagraph("email")}>
                                <p>Email</p>
                            </div>
                            <input
                                className={classValidasiForm("input", "email", message)}
                                type="text"
                                value={email}
                                onChange={(input) => setEmail(input.target.value)}
                            />
                            {message.email !== undefined ? <p className="validasi_msg">{message.email}</p> : ""}
                        </div>
                        <div className="parent_input group">
                            <div className={classParagraph("password")}>
                                <p>Password</p>
                            </div>
                            <div className="absolute h-full flex items-center right-0 pr-4 z-[2] cursor-pointer">
                                <div onClick={() => dispatch(updatePas(!booleanPas))}>
                                    {!booleanPas
                                        ? <AiOutlineEyeInvisible />
                                        : <AiOutlineEye />
                                    }
                                </div>
                            </div>
                            <input
                                className={classValidasiForm("input", "password", message)}
                                type={!booleanPas ? "password" : "text"}
                                value={password}
                                onChange={(input) => setPassword(input.target.value)}
                            />
                            {message.password !== undefined ? <p className="validasi_msg">{message.password}</p> : ""}
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button className='text-sm transition-all duration-300 text-gray-400 hover:text-black'>Recovery Password</button>
                    </div>
                    <button
                        className={email && password ? "btn_form" : "btn_form-hidden"}
                    >Sign in</button>
                </form>
            </div>
        </>
    )
}

export default Login