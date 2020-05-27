import React, {Component} from "react";
import {Platform, StatusBar, View} from "react-native";

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import decks from './store/reducers/index';
import middleware from './middleware/index';

import Constants from 'expo-constants';
import {Ionicons} from '@expo/vector-icons';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import DeckList from './components/DeckList';
import DeckDetails from './components/DeckDetails';
import DeckCreate from './components/DeckCreate';
import CardCreate from './components/CardCreate';
import DeckQuiz from './components/DeckQuiz';
import {color, setLocalNotification} from "./utils/helpers";

const store = createStore(decks, middleware);
const Tab = createBottomTabNavigator();
const DecksStack = createStackNavigator();
const DeckCreateStack = createStackNavigator();

function DecksStackScreen() {
    return (
        <DecksStack.Navigator>
            <DecksStack.Screen name="ALL DECKS" component={DeckList}/>
            <DecksStack.Screen name="DECK DETAILS" component={DeckDetails}/>
            <DecksStack.Screen name="ADD CARD" component={CardCreate}/>
            <DecksStack.Screen name="QUIZ" component={DeckQuiz}/>
            <DeckCreateStack.Screen name="NEW DECK" component={DeckCreate}/>
        </DecksStack.Navigator>
    );
}

function DeckCreateStackScreen() {
    return (
        <DeckCreateStack.Navigator>
            <DeckCreateStack.Screen name="NEW DECK" component={DeckCreate}/>
        </DeckCreateStack.Navigator>
    );
}

function MobileFlashCardsStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    );
}

export default class App extends Component {
    componentDidMount() {
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <MobileFlashCardsStatusBar backgroundColor={color.primary} barStyle="light-content"/>
                    <NavigationContainer>
                        <Tab.Navigator
                            screenOptions={({route}) => ({
                                tabBarIcon: ({focused, color, size}) => {
                                    let iconName;

                                    if (route.name === 'Decks') {
                                        iconName = focused
                                            ? 'ios-list-box'
                                            : 'ios-list';
                                    } else if (route.name === 'New Deck') {
                                        iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
                                    }

                                    return <Ionicons name={iconName} size={size} color={color}/>;
                                },
                            })}

                            tabBarOptions={{
                                activeTintColor: Platform.OS === 'ios' ? color.primary : color.white,
                                style: {
                                    height: 60,
                                    backgroundColor: Platform.OS === 'ios' ? color.white : color.purple,
                                    shadowColor: 'rgba(0, 0, 0, 0.24)',
                                    shadowOffset: {
                                        width: 0,
                                        height: 3
                                    },
                                    shadowRadius: 6,
                                    shadowOpacity: 1
                                }
                            }}
                        >
                            <Tab.Screen name="Decks" component={DecksStackScreen}/>
                            <Tab.Screen name="New Deck" component={DeckCreateStackScreen}/>
                        </Tab.Navigator>
                    </NavigationContainer>
                </View>
            </Provider>
        );
    }
}