export enum ActionEnumProjectControl{
    CREATE_PROJECT = "create_project",
    DELETE_PROJECT = "delete_project",
    RENAME_PROJECT = "rename_project",
    ICON_PROJECT = "icon_project"
}
interface ProjectCreateInterface {
    type: ActionEnumProjectControl.CREATE_PROJECT
    id: number
    name: string
    projectIcon: number
}
interface ProjectDeleteInterface {
    type: ActionEnumProjectControl.DELETE_PROJECT
    id: number
    elemPosition: number
}
interface ProjectRenameInterface {
    type: ActionEnumProjectControl.RENAME_PROJECT
    id: number
    name: string
}
interface ProjectIconInterface {
    type: ActionEnumProjectControl.ICON_PROJECT
    id: number
    projectIconValue: number
}


export type ActionProjectControl = ProjectCreateInterface | ProjectDeleteInterface | ProjectRenameInterface | ProjectIconInterface