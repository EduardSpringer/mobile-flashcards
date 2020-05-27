import React, {Component} from 'react'
import {Button, StyleSheet, Text, View} from 'react-native'

import {connect} from 'react-redux'

import {color, themes} from "../utils/helpers";
import {removeDeck as removeDeckFromLS} from '../utils/api'
import {removeDeck} from '../store/actions/index'

class DeckDetails extends Component {
    render() {
        const {navigation, decks, deckId} = this.props;
        let deck = decks[deckId]

        console.log(deckId)

        this.props.navigation.setOptions({
            title: deckId
        })

        if(!deck) {
            return (
                <View>
                    <Text style={themes.title}>No Card Details available.</Text>
                </View>
            )
        }

        return (
                <View style={themes.container}>
                    <View>
                        <Text style={styles.deckText}>{deckId}</Text>
                    </View>
                    <View>
                        <Text style={styles.cardText}>{deck.questions.length} cards</Text>
                    </View>
                    <View style={themes.block}>
                        <Button title="Add Card" onPress={() => {
                            navigation.push('ADD CARD', {deckId: deckId})
                        }}/>
                    </View>
                    <View style={themes.block}>
                        <Button title="Start Quiz" color="green" onPress={() => {
                            navigation.push('QUIZ', {deckId: deckId})
                        }}/>
                    </View>
                    <View style={{marginTop: 40}}>
                        <Button title="Delete Deck" color={color.secondary} onPress={() => {
                            removeDeckFromLS(deckId)
                                .then(() => {
                                    this.props.removeDeck(deckId)
                                    navigation.push('ALL DECKS')
                                })
                        }}/>
                    </View>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    deckText: {
        fontSize: 30,
        alignSelf: "center",
        color: color.primary
    },
    cardText: {
        alignSelf: "center",
        marginBottom: 20,
        fontSize: 14,
        color: color.primary
    }
});

const mapStateToProps = (decks, navigation) => {
    return{
        deckId: navigation.route.params.deckId,
        decks: decks
    }
};

const mapDispatchToProps = dispatch => ({
    removeDeck: title => dispatch(removeDeck(title))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeckDetails);