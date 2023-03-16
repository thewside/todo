import { createRef, useState } from "react"

interface FileFieldInterface {
    children?: React.ReactNode
}

interface ImageDataInterface {
    url: string
    base64: string
}

export const FileField: React.FC<FileFieldInterface> = () => {
    const inputRef = createRef<HTMLInputElement>
    const [imageData, setImageData] = useState<ImageDataInterface>({
        url: "",
        base64: ""
    })

    return (
        <form>
            <input type="file" />
        </form>
    )
}