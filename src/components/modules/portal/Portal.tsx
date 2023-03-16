import { useEffect, useState } from "react"
import ReactDOM from "react-dom"

interface PortalInterface {
    element?: React.MutableRefObject<HTMLDivElement | null>
    children: React.ReactNode
}

export const Portal: React.FC<PortalInterface> = ({ element, children }) => {
    const [container] = useState(document.createElement("div"))
    // const coords = element?.current?.getBoundingClientRect()
    // let elementIconsPosition = {
    //     top: coords ? coords.top + coords.height : 0,
    //     left: coords?.left
    // }

    // const setResize = () => {
    //     container.style.cssText = `
    //     position: absolute;
    //     top: ${elementIconsPosition.top}px;
    //     left: ${elementIconsPosition.left}px;`
    // }

    // const onResize = () => {
    //     const coords = element?.current?.getBoundingClientRect()
    //     elementIconsPosition = {
    //         ...elementIconsPosition,
    //         top: coords ? coords.top + coords.height : 0,
    //         left: coords?.left
    //     }
    //     setResize()
    // }

    useEffect(() => {
        // setResize()
        // window.addEventListener("resize", onResize);
        document.body.appendChild(container)
        return () => {
            // window.removeEventListener("resize", onResize)
            document.body.removeChild(container)
        }
    }, [])

    return ReactDOM.createPortal(children, container)
}