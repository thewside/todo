import { combineReducers } from "redux"
import { projectControl} from "./reducer-project-control"
// import { globalOptions } from "./reducer-global-options"

export const rootReducer = combineReducers({
    projectControl,
    // globalOptions
})