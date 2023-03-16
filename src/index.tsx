import React from "react"
import ReactDOM from "react-dom/client"
import "./index.scss"
import { App } from "./App"
import { Provider } from "react-redux"
import {store} from "./redux/store"
import { AppContextProvider } from "./components/modules/AppContextProvider"
import { createBrowserRouter, createRoutesFromElements, Route, Link, Outlet, RouterProvider } from "react-router-dom"
import { Start } from "./components/Start"
import { Project } from "./components/inside-project/Project"

const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Start/>}></Route>
        <Route path="/projects" element={<App/>}>
          <Route path=":id" element={<Project/>}></Route>
        </Route>
      </>
    )
  )
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
)
root.render(
    <Provider store={store}>
      <AppContextProvider>
        <RouterProvider router={router}/>
      </AppContextProvider>
    </Provider>
)
