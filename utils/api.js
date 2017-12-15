import {AsyncStorage} from 'react-native'

const DB_STORAGE_KEY = 'Flashcard:deck'

// to clear AsyncStorage
export const clearData = () => {
    AsyncStorage.removeItem(DB_STORAGE_KEY)
}

// helper methods for AsyncStorage Database
const initData = () => {
    const decks = {
        Cars: {
            title: 'Cars',
            questions: [
                {
                    question: 'California was the first state to allow driverless cars.',
                    answer: false,
                },

                {
                    question: 'The founder of the American car brand Chevrolet was Swiss.',
                    answer: true,
                },

                {
                    question: 'Japan is the country that builds the largest number of cars in the world.',
                    answer: false,
                },

                {
                    question: 'The Jaguar brand belongs to the Indian group, TATA Motors.',
                    answer: true,
                },

                {
                    question: 'Initially, Lamborghini manufactured agricultural tractors.',
                    answer: true,
                },
            ]
        },
        Computers: {
            title: 'Computers',
            questions: [
                {
                    question: 'In 1993, the Mosaic browser innovated by displaying text and images.',
                    answer: true
                },
                {
                    question: 'Bill Gates (Microsoft) created Pong, the first home video game.',
                    answer: false
                }
            ]
        },

        Earth: {
            title: 'Earth',
            questions: [
                {
                    question: 'It takes about 8 seconds for the Sun’s rays to reach Earth.',
                    answer: false
                },

                {
                    question: 'The Great Barrier Reef is visible from space.',
                    answer: true
                },

                {
                    question: 'The Atacama Desert in Chile is the driest place on Earth.',
                    answer: true
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
