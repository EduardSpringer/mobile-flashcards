import React, {Component} from 'react'
import {Button, TextInput, View} from 'react-native'

import {connect} from 'react-redux'

import {themes} from "../utils/helpers";
import {addCardToDeck as addCardToDeckToLS} from '../utils/api'
import {addCardToDeck} from '../store/actions/index'

class CardCreate extends Component {
    state = {
        question: '',
        answer: ''
    }

    handleChangeInput = attribute => input => {
        this.setState({[attribute]: input})
    }

    handlePressButton = () => {
        const {deckId} = this.props
        const {question, answer} = this.state

        addCardToDeckToLS(deckId, {question: question, answer: answer})
            .then(
                this.props.addCard(deckId, {question: question, answer: answer})
            )
            .then(
                () => {
                    this.props.navigation.push('DECK DETAILS', {deckId: deckId})
                }
            )
    }

    render() {
        return (
            <View style={themes.container}>
                <TextInput
                    style={themes.input}
                    value={this.state.question}
                    onChangeText={this.handleChangeInput('question')}
                    placeholder="Question"
                    autoFocus={true}
                    returnKeyType="done"
                />
                <TextInput
                    style={themes.input}
                    value={this.state.answer}
                    onChangeText={this.handleChangeInput('answer')}
                    placeholder="Answer"
                    returnKeyType="done"
                />
                <Button disabled={this.state.question === '' || this.state.answer === ''} title="Add"
                        onPress={this.handlePressButton}/>
            </View>
        )
    }
}

const mapStateToProps = (decks, navigation) => {
    return {
        deckId: navigation.route.params.deckId,
        decks: decks
    }
};

const mapDispatchToProps = dispatch => ({
    addCard: (title, card) => dispatch(addCardToDeck(title, card))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardCreate);