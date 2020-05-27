import React, {Component} from 'react'
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons';

import {connect} from 'react-redux'
import {getDecks} from '../store/actions/index'

import {getDecks as getDecksFromLS} from '../utils/api'
import {color, themes} from "../utils/helpers";


class DeckList extends Component {
    state = {
        initDecks: false
    }

    componentDidMount() {
        getDecksFromLS()
            .then(decks => this.props.receiveDecks(decks))
            .then(() => {
                this.setState({initDecks: true})
            })
    }

    render() {
        const {decks, navigation} = this.props;
        const {initDecks} = this.state

        console.log(decks)

        if (!initDecks || !decks) {
            return (
                <View style={themes.container}>
                    <Text style={themes.title}>Initializing decks...</Text>
                </View> )

             }

        if (initDecks && Object.values(decks).length > 0) {
            return (<ScrollView style={themes.container}>
                <MaterialCommunityIcons style={styles.icon} name="cards-outline" size={50} color={color.secondary}/>
                {Object.values(decks).map(deck => {
                    return (
                        <TouchableOpacity
                            key={deck.title}
                            onPress={() =>
                                navigation.push('DECK DETAILS', {deckId: deck.title})
                            }
                        >
                            <View key={deck.title} style={styles.deck}>
                                <View>
                                    <Text style={styles.deckText}>{deck.title}</Text>
                                </View>
                                <View>
                                    <Text style={styles.cardText}>{deck.questions.length} cards</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>)
        } else {
            return ((<View style={themes.container}>
                <Text style={themes.title}>No decks are currently created.</Text>
            </View>))
        }
    }
}

const styles = StyleSheet.create({
    icon: {
        alignSelf: "center",
        marginBottom: 20
    },
    deck: {
        alignItems: 'center',
        justifyContent: 'center',
        flexBasis: 120,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: color.primary,
        backgroundColor: color.primary,
        marginBottom: 10,
        height: 120,
    },
    deckText: {
        fontSize: 30,
        color: color.white
    },
    cardText: {
        fontSize: 14,
        color: color.white
    }
});

const mapStateToProps = (decks) => ({
    decks: decks
});

const mapDispatchToProps = dispatch => ({
    receiveDecks: decks => dispatch(getDecks(decks))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeckList);