export function reducer(state, action){
  switch(action.type){
    case 'setLineEnd':
      return {
        ...state,
        lineEnd: action.value
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