import {AsyncStorage} from "react-native";

export const STORAGE_KEY = 'MobileFlashCards:api'

export const getDecks = async () => {
    try {
        return await AsyncStorage.getItem(STORAGE_KEY)
            .then(JSON.parse)
/*            .then(results => {
                    const data = JSON.parse(results)
                    return data
                }
            )*/
    } catch {
        console.log(error.message)
    }
}

export const addDeck = async (title) => {
    try {
        await AsyncStorage.mergeItem(STORAGE_KEY,
            JSON.stringify({
                    [title]: {
                        title: title,
                        questions: []
                    }
                }
            ))
    } catch (error) {
        console.log(error.message)
    }
}

export const getDeck = async (title) => {
    try {
        return await AsyncStorage.getItem(STORAGE_KEY)
            .then(JSON.parse)
            .then(data => {
                    return data[title]
                }
            )
    } catch {
        console.log(error.message)
    }
}

export const addCardToDeck = async (title, card) => {
    try {
        await AsyncStorage.getItem(STORAGE_KEY)
            .then(JSON.parse)
            .then(data => {
                data[title].questions.push(card)

                AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(data))
            })
    } catch (error) {
        console.log(error.message)
    }
}

export const removeDeck = async (title) => {
    try {
        await AsyncStorage.getItem(STORAGE_KEY)
            .then(JSON.parse)
            .then(data => {
                data[title] = undefined
                delete data[title]

                AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
            })
    } catch (error) {
        console.log(error.message)
    }
}

export const clearAsyncStorage = async () => {
    try {
        await AsyncStorage.clear()
    } catch (error) {
        console.log(error.message)
    }
}

/* AsyncStorage */
/*
{
    React: {
        title: 'React',
            questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
            questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
}*/