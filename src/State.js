export function reducer(state, action){
  switch(action.type){
    case 'testCase':
      return {
        ...state,
        activeDragObj: !state.activeDragObj
      }
    case 'setDragObj':
      return {
        ...state,
        activeDragObj: action.value
      }
    case 'clearDragObj':
      return {
        ...state,
        activeDragObj: null
      }
    default:
      break;
  }
  return state
}