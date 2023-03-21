import { useEffect, useState } from "react"

const useLockScroll = () => {
    const [isLocked, setIsLocked] = useState(false);
    const bodyStyle = document.body.style;

    useEffect(() => {
        bodyStyle.overflowY = isLocked ? "hidden" : "auto"
    }, [bodyStyle, isLocked])

    const toggleScroll = () => setIsLocked(!isLocked);

    return [toggleScroll]
}

export default useLockScroll