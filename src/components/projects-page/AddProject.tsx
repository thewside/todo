import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ActionEnumProjectControl } from "../../redux/actions/action-project-control"
import { StateInterface } from "../../redux/types"
import { useAppContext } from "../modules/AppContextProvider"
import "./add-project.scss"
import "../style/input-dark.scss"
import config from "../../config.json"

import classNames from "classnames"

const selectState = (state: StateInterface) => state
export const AddProject = () => {
    const data = useSelector(selectState)
    const dispatch = useDispatch()
    const {darkMode, iconPosition, setProjectIdChoose, setIconPosition} = useAppContext()

    const [name, setName] = useState<string>("")
    const [focus, setFocus] = useState<boolean>(false)
    const [show, setShow] = useState<boolean>(false)

    const refProjectName = useRef<HTMLInputElement | null>(null)

    const onChange = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement
        setName(target.value)
    }

    const createProject = (): void => {
        const id = Number((Date.now() + 1).toString().slice(3))
        dispatch({
            type: ActionEnumProjectControl.CREATE_PROJECT,
            id: id,
            name: name.slice(0, config.projectNameLimit) || "Project" + " " + (data.projectControl.length + 1),
            projectIcon: iconPosition || 0
        })
        setName("")
        setProjectIdChoose!(id)
    }

    const acceptOnKey = (e: React.KeyboardEvent) => {
        if(!focus) {
            e.preventDefault()
            return
        }
        if(e.shiftKey && e.keyCode === 13) {
            e.preventDefault()
            return
        }
        if (e.keyCode === 13 || e.key === "Enter") {
            e.preventDefault()
            createProject()
        }
    }

    const onFocus = () => {
        setFocus(true)
    }

    const onBlur = () => {
        setFocus(false)
    }

    const iconController = {
        show: () => {
            setShow(prev => !prev)
        },
        setIcon: (index: number) => {
            setIconPosition!(index)
            setShow(false)
        },
        close: () => {
            setShow(false)
        }
    }

    const mainIcon = config.projectIcons[iconPosition]
    const otherIcons = config.projectIcons.map((icon, index) => {
        if (index === iconPosition) return
        return <div
            key={index}
            onClick={() => iconController.setIcon(index)}
            data-button="create-project-icon"
        >
            <img className="no-pointer" src={`/svg/${icon}.svg`} alt=""></img>
        </div>
    })

    const globalClose = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        if(target.dataset.button !== "create-project-icon") {
            iconController.close()
        }
    }

    useEffect(() => {
        if (refProjectName.current) {
            refProjectName.current.addEventListener("focus", onFocus)
            refProjectName.current.addEventListener("blur", onBlur)
        }
        window.addEventListener("click", globalClose)

        return () => {
            window.removeEventListener("focus", onFocus)
            window.removeEventListener("blur", onBlur)
            window.removeEventListener("click", globalClose)
        }
    }, [])

    const classNamesList = {
        input: {
            "input-dark ": darkMode
        },
        iconsList: {
            "add-icons-list": true,
            "icons-list-dark": darkMode
        },
        projectIcons: {
            "add-project-icons": true,
            "project-icons-dark": darkMode
        }
    }

    const classInput = classNames(classNamesList.input)

    const classIconsList = classNames(classNamesList.iconsList)
    const classProjectIcons = classNames(classNamesList.projectIcons)

    return <div className="add-project-container">
        <div
            className={classProjectIcons}
        >
            <select
                style={{ display: "none" }}
            >
                {config.projectIcons.map(index => {
                    return <option value={index} key={index}></option>
                })}
            </select>
            <div className="add-icons-container">
                <div
                    className="selected-icon"
                    style={{ zIndex: 999 }}
                    onClick={iconController.show}
                    data-button="create-project-icon"
                >
                    <img className="no-pointer" src={`/svg/${mainIcon}.svg`} alt=""></img>
                </div>
                <div
                    style={{ display: show ? "" : "none" }}
                    className={classIconsList}
                >
                    {otherIcons}
                </div>
            </div>
        </div>

        <div
            className="add-project-name"
        >
            <input
                ref={refProjectName}
                onChange={e => onChange(e)}
                type="text"
                placeholder="Имя проекта"
                value={name}
                onKeyDown={e => {
                    acceptOnKey(e)
                }}
                className={classInput}
            ></input>
        </div>

        <div
            className="add-project-button"
            style={{backgroundColor: darkMode ? "rgb(51, 55, 58)" : "white"}}
        >
            <button
                onClick={createProject}
                style={{
                    backgroundColor: darkMode ? "rgb(51, 55, 58)" : "white",
                    color: darkMode ? "white" : "black"
                }}
            >Add</button>
        </div>
    </div>
}