import {
    GET_DECKS,
    ADD_DECK,
    GET_DECK,
    ADD_CARD_TO_DECK,
    REMOVE_DECK
} from '../actions/index'

export default function decks (state = null, action) {
    switch(action.type){
        case GET_DECKS:
            const { decks } = action;
            return {
                ...state,
                ...decks
            }
        case ADD_DECK:
            const { title } = action;

            return {
                ...state,
                [title]: {
                    title: title,
                    questions: []
                }
            }
        case ADD_CARD_TO_DECK:
            return {
                ...state,
                [action.title]: {
                    ...state[action.title],
                    questions: [...state[action.title].questions].concat(action.card)
                }
            }
        case REMOVE_DECK:
            delete state[action.title]
            return state
        case GET_DECK:
            return {
                ...state,
                deck: action.deck
            }
        default:
            return state;
    }
}