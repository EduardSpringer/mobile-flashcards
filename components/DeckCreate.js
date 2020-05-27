import React, {Component} from 'react'
import {Button, Text, TextInput, View} from 'react-native'

import {connect} from 'react-redux'
import {addDeck} from '../store/actions/index'

import {addDeck as addDeckToLS} from '../utils/api';
import {themes} from '../utils/helpers'


class DeckCreate extends Component {
    state = {
        title: ''
    };

    handleChangeInput = title => {
        this.setState({title: title});
    };

    handleSubmit = () => {
        const {title} = this.state;

        addDeckToLS(title)
            .then(this.props.addingDeck(title))
            .then(() => {
                this.props.navigation.navigate('DECK DETAILS', {deckId: title})
            })
            .then(() => {
                this.setState({title: ''})
            })
    };

    render() {
        return (
            <View style={themes.container}>
                <View>
                    <Text style={themes.title}>What is the title of your new deck?</Text>
                </View>
                <View>
                    <TextInput
                        style={themes.input}
                        value={this.state.title}
                        onChangeText={this.handleChangeInput}
                        autoFocus={true}
                        placeholder="e.g. Geography"
                        returnKeyType="done"
                    />
                </View>
                <Button disabled={this.state.title === ''} title="Create Deck" onPress={this.handleSubmit}/>
            </View>
        )
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    addingDeck: title => dispatch(addDeck(title))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeckCreate);