
import { useDispatch, useSelector } from "react-redux"
import { ProjectInterface, StateInterface } from "../../redux/types"
import { ProjectPageItem } from "./ProjectsPageItem"
import "./projects-page.scss"
import { Nothing } from "../inside-project/Nothing"

interface ProjectPageInterface {
  items: Array<ProjectInterface>
}

export const ProjectsPage: React.FC<ProjectPageInterface> = ({items}) => {
  const projects = items?.map((item, index) => {
    return <ProjectPageItem key={index} item={item}/>
  })
  return (
    <div className="projects-page">
        {projects}
    </div>
    )
}