import { format } from 'date-fns'
import axios from 'axios'

const SET_PROJECTS = "projects/setProjects"
const ADD_NEW_PROJECTS = "projects/addNewProjects"
const ADD_OLD_PROJECTS = "projects/addOldProjects"

const setProjects = (projectsData) => ({
  type: SET_PROJECTS,
  payload: projectsData
})

const addNewProjects = (projectsData) => ({
  type: ADD_NEW_PROJECTS,
  payload: projectsData
})

const addOldProjects = (projectsData) => ({
  type: ADD_OLD_PROJECTS,
  payload: projectsData
})

export const initialLoadProjects = () => {
  return async dispatch => {
    try {
      let res = await axios.get('/api/projects')
      let projectsData = res.data
      dispatch(setProjects(projectsData))
    }
    catch (e) {
      console.log(e)
    }
  }
}


export const loadNewProjects = (start) => {
  return async dispatch => {
    try {
      let res = await axios.get(`/api/projects?start=${start}`)
      let projectsData = res.data
      console.log("project load: ", projectsData)
      dispatch(addNewProjects(projectsData))
    }
    catch (e) {
      console.log(e)
    }
  }
}


let initialState = {
  range: [],
  projects: {},
  total: null,
  loaded: null
}

function projectsReducer(state = initialState, action) {
  let newState = {}
  switch (action.type) {
    case SET_PROJECTS:
      newState["range"] = action.payload.range
      newState["projects"] = action.payload.projects
      newState["total"] = action.payload.total
      newState["loaded"] = action.payload.count
      return newState
    case ADD_NEW_PROJECTS:
      newState.range = [...state.range, ...action.payload.range]
      newState.projects = { ...state.projects, ...action.payload.projects }
      newState.total = action.payload.total
      newState.loaded = state.loaded + action.payload.count
      console.log(newState)
      return newState
    default:
      return state
  }
}

export default projectsReducer
