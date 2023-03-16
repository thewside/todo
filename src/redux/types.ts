
export interface ProjectInterface {
  id: number
  name: string
  tasks?: Array<TaskInterface>
  projectIcon: number
  elemPosition?: number
  completed: boolean
}
export interface StateInterface {
  projectControl: Array<ProjectInterface>
}

export interface SubTaskInterface {
  id?: string
  header?: string
  description?: string
  status?: boolean
}

export interface CommentInterface {
  id: string
  date: string
  description: string
}

export interface TaskInterface {
  id?: number
  header?: string
  description?: string
  dateOfCreation?: string
  dateOfCompletion?: string | null
  priority?: number
  fileId?: Array<string> | null
  status?: boolean
  subtasks?: Array<SubTaskInterface>
  comments?: Array<CommentInterface>
}

export interface ProjectStatusInterface {
    status: boolean
    complete: number
    all: number
}