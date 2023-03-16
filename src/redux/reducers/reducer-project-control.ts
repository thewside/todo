import {ActionEnumProjectControl, ActionProjectControl} from "../actions/action-project-control"

import { ProjectInterface } from "../types"

const projectList: Array<ProjectInterface> = [
    {
        id: Number((Date.now()).toString().slice(3)) + 55,
        name: "1",
        tasks: [
            {
                id: Number((Date.now()).toString().slice(3)),
                header: "string",
                description: "string",
                dateOfCreation: "string",
                dateOfCompletion: "string",
                priority: 0,
                fileId: [],
                status: true,
                subtasks: [],
                comments: []
            },
            {
                id: Number((Date.now()).toString().slice(3)),
                header: "string",
                description: "string",
                dateOfCreation: "string",
                dateOfCompletion: "string",
                priority: 0,
                fileId: [],
                status: false,
                subtasks: [],
                comments: []
            },
        ],
        projectIcon: 3,
        elemPosition: 0,
        completed: true
    },
    {
        id: Number((Date.now()).toString().slice(3)),
        name: "1",
        tasks: [
            {
                id: Number((Date.now()).toString().slice(3)),
                header: "string",
                description: "string",
                dateOfCreation: "string",
                dateOfCompletion: "string",
                priority: 0,
                fileId: [],
                status: true,
                subtasks: [],
                comments: []
            },
            {
                id: Number((Date.now()).toString().slice(3)),
                header: "string",
                description: "string",
                dateOfCreation: "string",
                dateOfCompletion: "string",
                priority: 0,
                fileId: [],
                status: true,
                subtasks: [],
                comments: []
            },
            {
                id: Number((Date.now()).toString().slice(3)),
                header: "string",
                description: "string",
                dateOfCreation: "string",
                dateOfCompletion: "string",
                priority: 0,
                fileId: [],
                status: true,
                subtasks: [],
                comments: []
            },
        ],
        projectIcon: 4,
        elemPosition: 0,
        completed: true
    },
    {
        id: Number((Date.now() + 1).toString().slice(3)),
        name: "2",
        tasks: [],
        projectIcon: 2,
        elemPosition: 1,
        completed: false
    }
]
export const projectControl = (state = projectList, action: ActionProjectControl) => {
    switch (action.type) {
        case ActionEnumProjectControl.CREATE_PROJECT:
            return [
               ...state,
                {
                    id: action.id,
                    name: action.name,
                    tasks: [],
                    projectIcon: action.projectIcon,
                    elemPosition: state.length,
                    completed: false
                }
            ].map((item, index) => {
                item.elemPosition = index
                return item
            })
        case ActionEnumProjectControl.RENAME_PROJECT:
            state.map(item => {
                if(item.id === action.id) {
                    item.name = action.name
                }
            })
            return [...state]
        case ActionEnumProjectControl.DELETE_PROJECT:
            let pos = 0
            state.forEach((item, index) => {
                if(item.id === action.id) pos = index
            })
            return [
                ...state.slice(0, pos),
                ...state.slice(pos + 1, state.length)
            ].map((item, index) => {
                item.elemPosition = index
                return item
            })

        case ActionEnumProjectControl.ICON_PROJECT:
            state.map(item => {
                if(item.id === action.id) {
                    item.projectIcon = action.projectIconValue
                }
            })
            return [...state]

        default:
            return state
    }
}