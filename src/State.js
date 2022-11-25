export function reducer(state, action){
  switch(action.type){
    case 'setHandlePos':
      return {
        ...state,
        handlePos: action.value
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