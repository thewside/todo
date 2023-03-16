import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"

import { ProjectInterface, ProjectStatusInterface, StateInterface, TaskInterface } from "../../redux/types"
import { useAppContext } from "../modules/AppContextProvider"
import { Nothing } from "./Nothing"
import "./project.scss"
import config from "../../config.json"
import { useEffect, useState } from "react"

const selectState = (state: StateInterface) => state
export const Project: React.FC = () => {
    const {projectIdChoose, iconPosition} = useAppContext()
    const data = useSelector(selectState)

    const [project, setProject] = useState<ProjectInterface | null>(null)
    const [mainIcon, setMainIcon] = useState<string>("")
    const [tasks, setTasks] = useState<Array<JSX.Element>>([])

    const getItem = (): ProjectInterface | null => {
        let item: ProjectInterface | null = null
        for (let i = 0; i < data.projectControl.length; i++) {
            if(projectIdChoose === data.projectControl[i].id) {
                item = data.projectControl[i]
            }
        }
        return item
    }

    const setIcon = () => {
        if(project) setMainIcon(config.projectIcons[project.projectIcon])
    }

    useEffect(() => {
        const projectRender = getItem()
        if(projectRender) setProject(({...projectRender}))
    }, [data.projectControl, projectIdChoose])

    useEffect(() => {
        setIcon()
    }, [project, data.projectControl])


    useEffect(() => {
        if(project?.tasks) {
            const newTasks = project.tasks.map((item, index) => {
                return <div key={index}>
                    {item.header}
                </div>
            })
            setTasks([...newTasks])
            checkTasksComplete()
        }
    }, [project])

    const [taskCompleteStatus, setTaskCompleteStatus] = useState<ProjectStatusInterface>({
        status: false,
        complete: 0,
        all: project?.tasks?.length || 0
    })

    const checkTasksComplete = () => {
        if(!project) {
            console.log("can't load project state")
            return
        }

        let i = 0
        project.tasks?.forEach(element => {
            if (element.status) i++
        })

        if (i > 0 && i === project.tasks?.length) {
            setTaskCompleteStatus(prev => ({
                ...prev,
                status: true,
                complete: i,
                all: project?.tasks?.length || 0
            }))
        } else {
            setTaskCompleteStatus(prev => ({
                ...prev,
                status: false,
                complete: i,
                all: project?.tasks?.length || 0
            }))
        }
    }

    return <div className="project">
        <div
            className="project-title"
        >
            <div className="project-icon">
                <img className="no-pointer" src={`/svg/${mainIcon}.svg`} alt=""></img>
            </div>
            <div className="project-name">
                <h1>{project?.name}</h1>
            </div>
        </div>
        <div
            className="project-id"
        >
            <h1>id: {project?.id}</h1>
        </div>
        <div>
            {
                taskCompleteStatus.status
                ? <div>
                    <div>{taskCompleteStatus.complete}/{taskCompleteStatus.all}✅</div>
                </div>
                : taskCompleteStatus.all === 0 ? <h1>no created tasks</h1>
                    : <div>
                        <div>{taskCompleteStatus.complete}/{taskCompleteStatus.all}❌</div>
                    </div>
            }
            { tasks }
        </div>
    </div>
}