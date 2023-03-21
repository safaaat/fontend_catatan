import React, { useCallback, useEffect, useState } from "react"

const LoadingCatatan = () => {
    const [dataLop, setDataLop] = useState([]);

    const lopping = useCallback(() => {
        let data = []

        for (let i = 0; i <= 4; i++) {
            data.push(i)
        }
        setDataLop(data)
    }, [])

    useEffect(() => {
        lopping()
    }, [lopping])

    return (
        <>
            {dataLop.map((data, index) => (
                <div key={index} className="bg-slate-200 w-full h-auto py-3 px-3 rounded-xl animate-pulse">
                    <div className="bg-slate-300 w-[10rem] h-[1rem] rounded-[.3rem]"></div>
                    <div className="bg-slate-300 w-[20rem] h-[.6rem] mt-3 rounded-sm"></div>
                    <div className="bg-slate-300 w-[10rem] h-[.6rem] mt-1 rounded-sm"></div>
                </div>
            ))}
        </>
    )
}

export default LoadingCatatan