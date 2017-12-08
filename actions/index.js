export const FETCH_DECKS = "FETCH_DECKS"
export const ADD_DECK = "ADD_DECK"
export const ADD_CARD = "ADD_CARD"
export const FETCH_DECK = "FETCH_DECK"


export const fetchDecks = (decks) => ({
  type : FETCH_DECKS,
  decks: decks
})


export const addDeck = (title) => ({
  type: ADD_DECK,
  title: title
})


export const fetchSingleDeck = (id) => ({
  type: FETCH_DECK,
  id: id
})


export const addCard = (title, card) =>({
  type: ADD_CARD,
  title: title,
  card: card
})
