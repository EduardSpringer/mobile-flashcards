import React, {Component} from 'react'
import {Button, Text, View} from 'react-native'

import {connect} from 'react-redux'

import {clearLocalNotification, color, setLocalNotification, themes} from "../utils/helpers";

class DeckQuiz extends Component {
    state = {
        numberOfCards: this.props.decks[this.props.deckId].questions.length,
        correct: 0,
        incorrect: 0,
        showAnswer: false
    }

    componentDidMount() {
        clearLocalNotification()
            .then(
                setLocalNotification
            )
    }

    handlePressButton = (attribute) => {
        switch (attribute) {
            case 'answer':
                this.setState({showAnswer: true})
                break;
            case 'question':
                this.setState({showAnswer: false})
                break;
            case 'correct':
                this.setState(prevState => ({correct: prevState.correct + 1}))
                break;
            case 'incorrect':
                this.setState(prevState => ({incorrect: prevState.incorrect + 1}))
                break;
            default:
                console.log(`${attribute} not found!`)
        }
    }

    render() {
        const {deckId, decks, navigation} = this.props;
        const {numberOfCards, correct, incorrect, showAnswer} = this.state
        let deck = decks[deckId]

        const numOfAnswers = incorrect + correct;
        let showResults = false;
        let hasQuestions = false;

        if (numOfAnswers !== numberOfCards) {
            showResults = true
        }

        if (deck.questions.length > 0) {
            hasQuestions = true
        }

        if (!hasQuestions) {
            return (<View style={themes.container}>
                <Text style={themes.title}>Sorry, you cannot take a quiz because there are no cards in the deck.</Text>
            </View>)
        }

        this.props.navigation.setOptions({
            title: `${deckId} Quiz`
        })

        return (
            <View style={themes.container}>
                <View>
                    {showResults && <Text>{`${correct + incorrect + 1} / ${numberOfCards}`}</Text>}
                </View>
                <View style={themes.block}>
                    {!showResults && <Text style={themes.title}>Quiz completed!</Text>}
                    {!showResults && <Text style={{
                        fontSize: 15,
                        color: color.primary,
                        alignSelf: 'center'
                    }}>{correct / numberOfCards * 100} % correct</Text>}
                </View>
                <View style={{marginBottom: 40}}>
                    {!showAnswer && showResults && <Text style={{
                        fontSize: 20,
                        color: color.primary,
                        alignSelf: 'center'
                    }}>{deck.questions[numOfAnswers].question}</Text>}
                    {showAnswer && showResults && <Text style={{
                        fontSize: 20,
                        color: color.secondary,
                        alignSelf: 'center'
                    }}>{deck.questions[numOfAnswers].answer}</Text>}
                </View>
                <View style={themes.block}>
                    {!showAnswer && showResults && <Button title="Show Answer" onPress={() => {
                        this.handlePressButton('answer')
                    }}/>}
                    {showAnswer && showResults && <Button title="Show Question" onPress={() => {
                        this.handlePressButton('question')
                    }}/>}
                </View>
                <View style={themes.block}>
                    {showResults && <Button color='green' title='Correct' onPress={() => {
                        this.handlePressButton('correct')
                    }}/>}
                </View>
                <View style={{marginBottom: 30}}>
                    {showResults && <Button color={color.secondary} title='Incorrect' onPress={() => {
                        this.handlePressButton('incorrect')
                    }}/>}
                    {!showResults && <Button color={color.secondary} title='Restart Quiz' onPress={() => {
                        navigation.push('QUIZ', {deckId: deckId})
                    }}/>}
                    {!showResults && <Button title="Back to Decks" onPress={() => {navigation.push('ALL DECKS')}}></Button>}
                </View>
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

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeckQuiz);
