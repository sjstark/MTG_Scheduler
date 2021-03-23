const SET_VIEW = 'views/setview'

export const setView = (view) => ({
  type: SET_VIEW,
  payload: view
})

let initialState = "Projects"

function viewReducer(state = initialState, action) {
  switch (action.type) {
    case SET_VIEW:
      return action.payload
    default:
      return state
  }
}

export default viewReducer
