import "./task-create-modal.scss"
import { useRef, useEffect, useState, ChangeEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { blobToBase64 } from "../../utils/blobToBase64"
import { StateInterface } from "../../redux/types"

interface ImageDataInterface {
    url: string | null
    base64: string | null
}

const selectTasks = (state: StateInterface) => state
export const TaskCreateModal = () => {
    const refInputTask = useRef<HTMLInputElement | null>(null)
    const refInputTextArea = useRef<HTMLTextAreaElement | null>(null)
    const refInputFile = useRef<HTMLInputElement | null>(null)

    const data = useSelector(selectTasks)
    // const pressed = data?.toggleReducer.isProcessing
    // const id = data?.toggleReducer.id
    const dispatch = useDispatch()

    const [imageData, setImageData] = useState<ImageDataInterface>({
        url: null,
        base64: null
    })

    useEffect(() => {
        if (imageData.url) {
            blobToBase64(imageData.url)
            .then(res => {
                if (typeof(res) === "string") {
                    setImageData(prev => ({
                        ...prev,
                        base64: res
                    }))
                }
            })
        }
    }, [imageData.url])

    useEffect(() => {
        console.log(imageData)
    }, [imageData])

    const checkFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if(!file) return
        if(file.type !== "image/jpeg" && file.type !== "image/png" && file.type !== "image/webp") {
            e.target.value = ""
            return
        }
        // if(file.size > config.maxFileSize) {
        //     alert(`to large file, max size ${1}mb`)
        //     e.target.value = ""
        //     return
        // }
        setImageData(prev => ({
            ...prev,
            url: URL.createObjectURL(file)
        }))
    }

    const deleteFile = () => {
        const file = refInputFile.current
        if(file) file.value = ""
        setImageData(prev => ({
            ...prev,
            url: null,
            base64: null
        }))
        if(imageData.url) URL.revokeObjectURL(imageData.url)
    }

    const createTask = async() => {
        // const taskContainer = data.dataReducer[id].tasks
        // if(!taskContainer) return
        // if(pressed) return

        const newTask = {
            // id: taskContainer.length,
            header: refInputTask.current?.value || "",
            description: refInputTextArea.current?.value || "",
            dateOfCreation: (Date.parse(`${new Date()}`)).toString(),
            dateOfCompletion: null,
            priority: 0, // priority slider
            fileId: [(Date.parse(`${new Date()}`)).toString()],
            status: false,
            subtasks: [],
            comments: []
        }

        // dispatch({
        //     type: ActionTypeToggle.TOGGLE_PROCESS_START
        // })

        try {
            // await API.addTask(id, newTask)
            // dispatch({
            //     type: ActionTypeData.ADD_TASK,
            //     payload: {
            //         id: id,
            //         task: newTask
            //     }
            // })
            // dispatch({
            //     type: ActionTypeData.TOGGLE,
            //     modal: false
            // })
        } catch (e) {
            console.log(e)
        } finally {
            // dispatch({
            //     type: ActionTypeToggle.TOGGLE_PROCESS_END
            // })
        }
    }

    return <div className="task-modal">
        <input
            ref={refInputTask}
        ></input>
        <textarea
            ref={refInputTextArea}
        ></textarea>
        <input
            ref={refInputFile}
            type="file"
            onChange={e => checkFile(e)}
        ></input>
        <button
            onMouseDown={() => deleteFile()}
        >delete</button>
        <button
            onMouseDown={() => {
                createTask()
            }}
        >create task</button>
        <button
            onMouseDown={() => {
                // dispatch({
                //     type: ActionTypeData.TOGGLE,
                //     modal: false
                // })
            }}
        >cancel</button>
    </div>
}



