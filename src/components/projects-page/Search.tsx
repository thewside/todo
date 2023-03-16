import { useRef, useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { ProjectInterface, StateInterface } from "../../redux/types"
import { ProjectPageItem } from "./ProjectsPageItem"

import classNames from "classnames"

import "../style/button-dark.scss"
import "../style/input-dark.scss"
import "./search.scss"
import { useAppContext } from "../modules/AppContextProvider"

interface SearchInterface {
    props: {
        isSearchTextPresent: boolean
        setSearchTextPresent: React.Dispatch<React.SetStateAction<boolean>>
        // searchResult?: Array<ProjectInterface>
        setSearchResult: React.Dispatch<React.SetStateAction<Array<ProjectInterface>>>
    }
}

const selectState = (state: StateInterface) => state
export const Search: React.FC<SearchInterface> = ({props}) => {
    const data = useSelector(selectState)
    const refSearch = useRef<HTMLInputElement | null>(null)
    const {darkMode} = useAppContext()
    const {
        isSearchTextPresent,
        setSearchTextPresent,
        // searchResult,
        setSearchResult
    } = props

    const APISearch = {
        searchStart: () => {
            if(!isSearchTextPresent) setSearchTextPresent(true)
            const value = refSearch.current?.value
            if(value === "") {
                setSearchTextPresent(false)
                return
            }
            data.projectControl.forEach((item, index) => {
                const name = item.name.toLowerCase()
                const searchReg = new RegExp(`${value?.toLowerCase()}`)
                if(name.match(searchReg)?.input === name) {
                    setSearchResult(prev => [
                        ...prev,
                        data.projectControl[index]
                    ])
                }
            })
        },
        clearResult: () => {
            setSearchResult([])
        },
        back: () => {
            setSearchResult([])
            setSearchTextPresent(false)
            if(refSearch.current?.value) refSearch.current.value = ""
        }
    }

    const searchStart = refSearch.current && refSearch.current.value.length > 0

    const classNamesList = {
        input: {
            "input-dark": darkMode
        },
        button: {
            "button-container": true,
            "button-container-light": !darkMode,
            "button-dark": darkMode
        }
    }

    const classInput = classNames(classNamesList.input)
    const classButton = classNames(classNamesList.button)

    return <div className="search-container">
        <div
            className="search-place"
        >
            <input
                ref={refSearch}
                type="text"
                placeholder="Найти проект"
                onChange={() => {
                    APISearch.clearResult()
                    APISearch.searchStart()
                }}
                className={classInput}
            ></input>
        </div>
        { searchStart
        ? <div
            className={classButton}
        >
            <button
                onClick={APISearch.back}
            >Вернуться к списку</button>
            </div>
        : null
        }
    </div>
}