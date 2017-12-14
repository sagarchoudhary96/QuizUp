import {AsyncStorage} from 'react-native'

const DB_STORAGE_KEY = 'Flashcard:deck'



export const clearData = () => {
    AsyncStorage.removeItem(DB_STORAGE_KEY)
}

// helper methods for AsyncStorage Database
const initData = () => {
    const decks = {
        React: {
            title: 'React',
            questions: [
                {
                    question: 'SectionList renders on-screen items, but with headers',
                    answer: true,
                },
                {
                    question: `'KeyboardAvoidingView' should always be contained within a 'View' component.`,
                    answer: false,
                }
            ]
        },
        JavaScript: {
            title: 'JavaScript',
            questions: [
                {
                    question: 'To convert Java to JavaScript, you would use a compiler.',
                    answer: false
                }
            ]
        },

        Css: {
            title: 'Css',
            questions: [
                {
                    question: 'To convert Java to JavaScript, you would use a compiler.',
                    answer: false
                }
            ]
        },
        Python: {
            title: 'Python',
            questions: [
                {
                    question: 'To convert Java to JavaScript, you would use a compiler.',
                    answer: false
                }
            ]
        }

    }

    AsyncStorage.setItem(DB_STORAGE_KEY, JSON.stringify(decks))
    return decks
}



export const getDecks = () => AsyncStorage.getItem(DB_STORAGE_KEY)
  .then(result => (result === null ?
            initData() :
            JSON.parse(result)))



export const getDeck = (id) => AsyncStorage.getItem(DB_STORAGE_KEY)
  .then(result => {
    const deck = result[id]
    return deck
  })



export const saveDeckTitle = (title) => AsyncStorage.mergeItem(DB_STORAGE_KEY, JSON.stringify({
  [title] : {
    title : title,
    questions: []
  }
}))


export const addCardToDeck = (title, card) => AsyncStorage.getItem(DB_STORAGE_KEY)
  .then(result => {
    result = JSON.parse(result)
    return AsyncStorage.mergeItem(DB_STORAGE_KEY, JSON.stringify({
      [title] : {
        questions : [...result[title].questions,card]
      }
    }))
  })
