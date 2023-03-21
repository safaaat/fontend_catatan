import React, { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from '../utils/icon';
import { useDispatch, useSelector } from 'react-redux';
import { updatePas, updateConf } from '../features/formRegisLogin';
import { RegisterUser, reset } from '../features/restApiLoginRegister';
import { updateRegisSign } from '../features/formRegisLogin';
import classValidasiForm from '../utils/classValidasiForm';
import Loading from './Loading';

const Register = () => {
    const [input, setInput] = useState({ name: "", email: "", password: "", confPassword: "" });
    const { booleanPas, booleanConf } = useSelector(state => state.formRegisLogin)
    const { message, isLoading } = useSelector(state => state.loginRegis)
    const dispatch = useDispatch();

    const formOnSubmit = (event) => {
        event.preventDefault();
        dispatch(RegisterUser(input))
    }
    const updateInput = (value) => {
        setInput((prev) => {
            return { ...prev, ...value }
        })
    }

    useEffect(() => {
        if (message === "Register success") {
            dispatch(updateRegisSign("sign in"));
            dispatch(reset());
        }
    }, [message, dispatch])

    const classParagraph = (tipe) => {
        if (tipe === "name") {
            if (message.name !== undefined && !input.name) return "parent_text-input group-focus-within:text-red-400"
            if (message.name !== undefined) return classValidasiForm("paragraph", "name", message)
            if (input.name) return "text-input_active text-color-primary"
            return "parent_text-input text-color-primary"
        }
        if (tipe === "email") {
            if (message.email !== undefined && !input.email) return "parent_text-input group-focus-within:text-red-400"
            if (message.email !== undefined) return classValidasiForm("paragraph", "email", message)
            if (input.email) return "text-input_active text-color-primary"
            return "parent_text-input text-color-primary"
        }
        if (tipe === "password") {
            if (message.password !== undefined && !input.password) return "parent_text-input group-focus-within:text-red-400"
            if (message.password !== undefined) return classValidasiForm("paragraph", "password", message)
            if (input.password) return "text-input_active text-color-primary"
            return "parent_text-input text-color-primary"
        }
        if (tipe === "confPassword") {
            if (message.confPassword !== undefined && !input.confPassword) return "parent_text-input group-focus-within:text-red-400"
            if (message.confPassword !== undefined) return classValidasiForm("paragraph", "confPassword", message)
            if (input.confPassword) return "text-input_active text-color-primary"
            return "parent_text-input text-color-primary"
        }
    }

    return (
        <>
            {isLoading ? <Loading /> : ""}
            <div>
                <h1 className="text-black text-center font-bold text-3xl">Register</h1>
                <form onSubmit={formOnSubmit} className="dimensi-form mt-12 mx-auto" >
                    <div className="grid gap-8 mt">
                        <div className="parent_input group">
                            <div className={classParagraph("name")}>
                                <p>Name</p>
                            </div>
                            <input
                                className={classValidasiForm("input", "name", message)}
                                type="text"
                                value={input.name}
                                onChange={(input) => updateInput({ name: input.target.value })}
                            />
                            {message.name !== undefined ? <p className="validasi_msg">{message.name}</p> : ""}
                        </div>
                        <div className="parent_input group">
                            <div className={classParagraph("email")}>
                                <p>Email</p>
                            </div>
                            <input
                                className={classValidasiForm("input", "email", message)}
                                type="text"
                                value={input.email}
                                onChange={(input) => updateInput({ email: input.target.value })}
                            />
                            {message.email !== undefined ? <p className="validasi_msg">{message.email}</p> : ""}
                        </div>
                        <div className="parent_input group">
                            <div className={classParagraph("password")}>
                                <p>Password</p>
                            </div>
                            <div className="absolute h-full flex items-center right-0 pr-4 z-[2] cursor-pointer">
                                <div onClick={() => dispatch(updatePas(!booleanPas))}>
                                    {!booleanPas ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </div>
                            </div>
                            <input
                                className={classValidasiForm("input", "password", message)}
                                type={!booleanPas ? "password" : "text"}
                                value={input.password}
                                onChange={(input) => updateInput({ password: input.target.value })}
                            />
                            {message.password !== undefined ? <p className="validasi_msg">{message.password}</p> : ""}
                        </div>
                        <div className="parent_input group">
                            <div className={classParagraph("confPassword")}>
                                <p>Confirmasi Password</p>
                            </div>
                            <div className="absolute h-full flex items-center right-0 pr-4 z-[2] cursor-pointer">
                                <div onClick={() => dispatch(updateConf(!booleanConf))}>
                                    {!booleanConf ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </div>
                            </div>
                            <input
                                className={classValidasiForm("input", "confPassword", message)}
                                type={!booleanConf ? "password" : "text"}
                                value={input.confPassword}
                                onChange={(input) => updateInput({ confPassword: input.target.value })}
                            />
                            {message.confPassword !== undefined ? <p className="validasi_msg">{message.confPassword}</p> : ""}
                        </div>
                    </div>
                    <button className={input.name && input.email && input.password && input.confPassword ? "btn_form" : "btn_form-hidden"}>Register</button>
                </form>
            </div >
        </>
    )
}

export default Register