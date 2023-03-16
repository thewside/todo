import React, { useContext, useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { ActionEnumProjectControl } from "../../redux/actions/action-project-control"
// import { EditMenuStatusInterface, StateInterface } from "../redux/types"
import { ProjectInterface, ProjectStatusInterface, StateInterface } from "../../redux/types"
import config from "../../config.json"
import { useAppContext } from "../modules/AppContextProvider"
import { Link } from "react-router-dom"

import classNames from "classnames"
import "../style/button-dark.scss"
import "../style/input-dark.scss"
import "./projects-page-item.scss"

interface ProjectComponentInterface {
    item: ProjectInterface
}

// const selectState = (state: StateInterface) => state
export const ProjectPageItem: React.FC<ProjectComponentInterface> = ({item}) => {
    const dispatch = useDispatch()

    const refSelect = useRef<HTMLSelectElement | null>(null)
    const refIconList = useRef<HTMLDivElement | null>(null)

    const refProjectEdit = useRef<HTMLDivElement | null>(null)

    const { darkMode, projectIdModal, setProjectIdModal, setProjectIdChoose, projectIdChoose } = useAppContext()
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const [menuShow, setMenuShow] = useState<boolean>(false)
    const [iconsShow, setIconsShow] = useState<boolean>(false)

    const popupController = {
        closeAll: (e?: MouseEvent) => {
            let elem
            if(e) elem = e.target as unknown as HTMLButtonElement | HTMLDivElement
            if(elem?.dataset.toggle === "toggle") return

            setMenuShow!(false)
            setIconsShow!(false)
        },
        showMenu: () => {
            setProjectIdModal!(item.id)
            setMenuShow!(!menuShow)
            if(isEdit) projectController.acceptName()
        },
        showIcons: () => {
            setProjectIdModal!(item.id)
            setIconsShow!(!iconsShow)
            if(isEdit) projectController.acceptName()
        }
    }

    const projectController = {
        deleteProject: () => {
            dispatch({
                type: ActionEnumProjectControl.DELETE_PROJECT,
                id: item.id,
                elemPosition: item.elemPosition
            })
            setProjectIdChoose!(0)
        },
        acceptName: () => {
            const name = refProjectEdit.current?.textContent?.slice(0, config.projectNameLimit).replace(/\s+/g, " ").trim() || ""
            dispatch({
                type: ActionEnumProjectControl.RENAME_PROJECT,
                id: item.id,
                name: name
            })
            setIsEdit(false)
        },
        setIcon: (value: number) => {
            dispatch({
                type: ActionEnumProjectControl.ICON_PROJECT,
                id: item.id,
                projectIconValue: value
            })
            console.log("seticon")
            setIconsShow!(!iconsShow)
        },
        setIsEdit: () => {
            setIsEdit(true)
            popupController.closeAll()
        }
    }

    const mainIcon = config.projectIcons[item.projectIcon]
    const otherIcons = config.projectIcons.map((icon, index) => {
        if (index === item.projectIcon) return
        return <div
            key={index}
            onClick={() => projectController.setIcon(index)}
        >
            <img className="no-pointer" src={`/svg/${icon}.svg`} alt=""></img>
        </div>
    })

    const acceptNewNameProject = (e?: MouseEvent) => {
        const target = e?.target as HTMLDivElement
        if(target.dataset.toggle) return
        if(target === refProjectEdit.current) return
        if(target.parentElement === refProjectEdit.current) return
        projectController.acceptName()
    }

    const acceptOnKey = (e: KeyboardEvent) => {
        if(refProjectEdit.current?.textContent === "") {
            if(e.key === "Backspace") e.preventDefault()
        }
        if(e.shiftKey && e.keyCode === 13) {
            e.preventDefault()
            return
        }
        if (e.keyCode === 13 || e.key === "Enter") {
            e.preventDefault()
            projectController.acceptName()
        }
    }

    const blur = (e?: FocusEvent) => {
        const target = e?.target as HTMLDivElement
        popupController.closeAll()
        if(target.dataset?.toggle === "delete") return
        projectController.acceptName()
    }

    const openProject = () => {
        if(isEdit) return
        if(projectIdChoose === item.id) return
        setProjectIdChoose!(item.id)
    }


    useEffect(() => {
        if(item.id !== projectIdModal) {
            popupController.closeAll()
        }
    }, [projectIdModal])

    useEffect(() => {
        if(iconsShow) setMenuShow!(false)
    }, [iconsShow])

    useEffect(() => {
        if(menuShow) setIconsShow!(false)
    }, [menuShow])

    useEffect(() => {
        window.addEventListener("click", popupController.closeAll)
        return () => window.removeEventListener("click", popupController.closeAll)
    }, [])

    useEffect(() => {
        if (!refProjectEdit.current) return
        if (isEdit) {
            refProjectEdit.current.focus()
            if (!window) return
            window.getSelection()!.selectAllChildren(refProjectEdit.current)
            window.getSelection()!.collapseToEnd()
        }
        if(isEdit) {
            window.addEventListener("click", acceptNewNameProject)
            window.addEventListener("blur", blur)
            window.addEventListener("keydown", acceptOnKey)
        }
        return () => {
            window.removeEventListener("click", acceptNewNameProject)
            window.removeEventListener("blur", blur)
            window.removeEventListener("keydown", acceptOnKey)
        }
    }, [isEdit])

    const [taskComplete, setTaskComplete] = useState<ProjectStatusInterface>({
        status: false,
        complete: 0,
        all: item.tasks?.length || 0
    })

    const checkTasksComplete = () => {
        let i = 0
        item.tasks?.forEach(element => {
            if (element.status) i++
        })
        if (i > 0 && i === item.tasks?.length) {
            setTaskComplete(prev => ({
                ...prev,
                status: true,
                complete: i
            }))

        } else {
            setTaskComplete(prev => ({
                ...prev,
                status: false,
                complete: i
            }))
        }
    }

    useEffect(() => {
        checkTasksComplete()
    }, [])


    const classNamesList = {
        menuButton: {
            menu: true,
            "button-dark": darkMode
        },
        input: {
            "input-dark": darkMode
        }
    }

    const classNameMenuButton = classNames(classNamesList.menuButton)
    const classNameInput = classNames(classNamesList.input)

    return <div
        className="project-item"
        // style={projectIdChoose === item.id ? {backgroundColor: "rgb(224, 255, 205)"} : {}}
    >
        <div
            className="icons"
        >
            <select ref={refSelect} style={{ display: "none" }}>
                {config.projectIcons.map(index => {
                    return <option value={index} key={index}></option>
                })}
            </select>

            <div className="icons-container">
                <div
                    ref={refIconList}
                    style={{ zIndex: 999 - item.elemPosition! }}
                    data-id={item.id}
                    onClick={popupController.showIcons}
                    data-toggle="toggle"
                >
                    <img className="no-pointer" src={`/svg/${mainIcon}.svg`} alt=""></img>
                </div>
                <div
                    style={{ display: iconsShow ? "" : "none" }}
                    className="icons-list"
                >
                    {otherIcons}
                </div>
            </div>
        </div>

        <Link to={`id${item.id}`}>
            <div
                className="name"
                onClick={openProject}
            >
                <div
                    suppressContentEditableWarning={true}
                    contentEditable={isEdit}
                    ref={refProjectEdit}
                    style={{cursor: isEdit ? "text" : "pointer"}}
                >
                    <h1>{item.name}</h1>
                </div>
            </div>
        </Link>
        {
            taskComplete.status
            ? <div>
                <div>{taskComplete.complete}/{taskComplete.all}✅</div>
            </div>
            : taskComplete.all === 0 ? null
                : <div>
                    <div>{taskComplete.complete}/{taskComplete.all}❌</div>
                </div>
        }
        <div
            className={classNameMenuButton}
        >
            {menuShow ? null
                : <button
                    onClick={popupController.showMenu}
                    data-toggle="toggle"
                >menu</button>
            }
            <div
                style={{ display: menuShow ? "" : "none" }}
            >
                <button
                    onClick={projectController.setIsEdit}
                    data-toggle="toggle"
                >edit</button>
                <button
                    data-toggle="delete"
                    onClick={projectController.deleteProject}
                >delete</button>

                {/* <button
                    data-toggle="open"
                >open</button> */}
            </div>
        </div>
    </div>
}