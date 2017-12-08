export default decks = (state = {}, action) => {
  switch(action.type) {
    case 'FETCH_DECKS':
      return action.decks

    case 'ADD_DECK':
      return {
          ...state,
          [action.title]: {
            title: action.title,
            questions: []
          }
        }

    case 'ADD_CARD':
    return {
        ...state,
        [action.title]: {
            ...state[action.title],
            questions: state[action.title].questions.concat(action.card)
        }
    }
    default:
      return state
    }
}
