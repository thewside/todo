import "./App.scss"
import {useState, useEffect} from "react"
import { ProjectsPage } from "./components/projects-page/ProjectsPage"
import { Project } from "./components/inside-project/Project"
import { useAppContext } from "./components/modules/AppContextProvider"
import { Search } from "./components/projects-page/Search"
import { AddProject } from "./components/projects-page/AddProject"
import { Nothing } from "./components/inside-project/Nothing"
import { ProjectInterface, StateInterface } from "./redux/types"
import { ProjectPageItem } from "./components/projects-page/ProjectsPageItem"
import { useSelector } from "react-redux"

const selectState = (state: StateInterface) => state

export const App = () => {
  const data = useSelector(selectState)
  const {projectIdChoose, darkMode, setDarkMode} = useAppContext()

  const [isSearchTextPresent, setSearchTextPresent] = useState<boolean>(false)
  const [searchResult, setSearchResult] = useState<Array<ProjectInterface>>([])

  const projectData = isSearchTextPresent && searchResult.length > 0 ? searchResult
  : !isSearchTextPresent && data.projectControl.length > 0 ? data.projectControl
  : null

  const changeTheme = () => {
    setDarkMode!(prev => !prev)
  }

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "rgb(43, 42, 42)" : "white"
  }, [darkMode, setDarkMode])


  return <>
    <div
      className="change-theme"
    >
      <button
        onClick={changeTheme}
        style={{backgroundColor: darkMode ? "grey" : "white"}}
      >change theme</button>
    </div>
    <div
      className="app"
      style={{backgroundColor: darkMode ? "rgb(51, 55, 58)" : "white"}}
    >
      <div
        className="head-block"
      >
        <Search props={{
          setSearchResult,
          isSearchTextPresent, setSearchTextPresent
        }} />
      </div>
      <div
        className="main-block"
      >
        <AddProject />
      </div>
      <div className="content-block">
        {/* { projectIdChoose && !search ? <Project/> : <Nothing/>} */}
        {projectData ? <ProjectsPage items={projectData} /> : <Nothing />}
      </div>
    </div>
  </>
}
