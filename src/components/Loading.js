import React from "react"
import { TbLoaderQuarter } from "../utils/icon"

const Loading = () => {
    return (
        <div className="bg-black/30 absolute flex justify-center items-center top-0 w-full h-full z-50">
            <div className="flex items-center gap-2">
                <div className="text-[1.5rem]">
                    <TbLoaderQuarter className="text-white animate-spin" />
                </div>
                <h1 className="text-white">Loading . . .</h1>
            </div>
        </div>
    )
}

export default Loading