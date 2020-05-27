export const GET_DECKS = 'GET_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const GET_DECK = 'GET_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'

export function getDecks (decks) {
    return {
        type: GET_DECKS,
        decks
    }
}

export function addDeck (title) {
    return {
        type: ADD_DECK,
        title
    }
}

export function getDeck (title) {
    return {
        type: GET_DECK,
        title
    }
}

export function addCardToDeck (title, card) {
    return {
        type: ADD_CARD_TO_DECK,
        title,
        card
    }
}

export function removeDeck (title) {
    return {
        type: REMOVE_DECK,
        title
    }
}