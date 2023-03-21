import { useCallback, useEffect, useState } from "react"

const useOnScroll = (activeBtn) => {
    const [catatan, setCatatan] = useState(false);
    const [icon, setIcon] = useState(false);
    const [fontSizes, setFontSizes] = useState(50);
    const [size, setSize] = useState()
    const [opacitys, setOpacitys] = useState(1);

    const updateSize = useCallback(() => {
        if (window.innerWidth <= 320) return setSize(30)
        if (window.innerWidth <= 360) return setSize(36)
        if (window.innerWidth <= 640) return setSize(40)
        return setSize(45)
    }, [])

    useEffect(() => {
        updateSize()
        setFontSizes(size)
        const onScroll = () => {
            if (window.innerWidth > 640) {
                if (window.scrollY <= 99) {
                    setIcon(false);
                    setFontSizes(size - window.scrollY / 5)
                }
                if (window.scrollY > 99) setIcon(true);
                if (window.scrollY <= 11) setCatatan(false);
                if (window.scrollY > 11) setCatatan(true);
            }
            if (window.innerWidth <= 640) {
                if (window.scrollY <= 65) {
                    setIcon(false);
                    setFontSizes(size - window.scrollY / 5)
                }
                if (window.scrollY > 65) setIcon(true);
                if (window.scrollY <= 6) setCatatan(false);
                if (window.scrollY > 6) setCatatan(true);
            }
            if (window.innerWidth <= 320) {
                if (window.scrollY <= 65) {
                    setIcon(false);
                    setFontSizes(size - window.scrollY / 10)
                }
                if (window.scrollY > 65) setIcon(true);
                if (window.scrollY <= 6) setCatatan(false);
                if (window.scrollY > 6) setCatatan(true);
            }
        }

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [updateSize, size, activeBtn])


    const textOpacity = useCallback(() => {
        // Opacity Text
        if (activeBtn === true) {
            let dataOpacity = 99
            let nol = 0.
            let hasil = dataOpacity - window.scrollY
            if (hasil >= 10) setOpacitys(`${nol}.${hasil}`)
            if (hasil < 10) setOpacitys(`${nol}`)
        }
        if (activeBtn === false) return setOpacitys(1)
    }, [activeBtn])

    useEffect(() => {
        textOpacity()

        window.addEventListener("scroll", textOpacity);
        return () => window.removeEventListener("scroll", textOpacity);
    }, [textOpacity])

    return [catatan, icon, fontSizes, opacitys]
}

export default useOnScroll