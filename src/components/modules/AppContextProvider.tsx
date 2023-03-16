import { createContext, useContext, useEffect, useState } from "react"

interface ContextInterface {
    darkMode: boolean
    setDarkMode?: React.Dispatch<React.SetStateAction<boolean>>
    iconPosition: number
    projectIdModal: number
    projectIdChoose: number
    setIconPosition?(pos: number): void
    setProjectIdModal?(pos: number): void
    setProjectIdChoose?(pos: number): void
}

interface AppContextProvideInterface {
    children: React.ReactNode
}

const AppContext = createContext<ContextInterface>({
    darkMode: false,
    iconPosition: 0,
    projectIdModal: 0,
    projectIdChoose: 0
})


export const AppContextProvider: React.FC<AppContextProvideInterface> = ({ children }) => {

    const [projectIdModal, setProjectIdModal] = useState<number>(0)
    const [projectIdChoose, setProjectIdChoose] = useState<number>(0)
    const [iconPosition, setIconPosition] = useState<number>(0)
    const [darkMode, setDarkMode] = useState<boolean>(false)

    return <AppContext.Provider value={{
        iconPosition, setIconPosition,
        projectIdModal, setProjectIdModal,
        projectIdChoose, setProjectIdChoose,
        darkMode, setDarkMode
        }}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)