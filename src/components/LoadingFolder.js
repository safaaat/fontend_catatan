import React, { useCallback, useEffect, useState } from "react"

const LoadingFolder = () => {
    const [data, setData] = useState([]);

    const lopping = useCallback(() => {
        let datalop = []
        for (let i = 0; i <= 10; i++) {
            datalop.push(i);
        }
        return setData(datalop)
    }, [])

    useEffect(() => {
        lopping()
    }, [lopping])

    return (
        <>
            <div className="px-5 mt-2 grid gap-2">
                {data.map((data, index) => (
                    <div key={index}>
                        <div className="bg-slate-100 flex items-center w-full h-[2rem] rounded-md animate-pulse gap-3 px-2">
                            <div className="bg-slate-300 w-[1rem] h-[1rem] rounded-[4px]"></div>
                            <div className="bg-slate-300 w-[10rem] h-[1rem] rounded-[4px]"></div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default LoadingFolder