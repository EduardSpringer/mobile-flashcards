import {AsyncStorage, StyleSheet} from 'react-native'
import {askAsync, NOTIFICATIONS} from 'expo-permissions'
import {Notifications} from 'expo'

const NOTIFICATION_KEY = 'MobileFlashCards:notifications'

export const color = {
    white: '#fff',
    primary: '#43425d',
    secondary: '#e61f5c',
}

export const themes = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    title: {
        textAlign: 'center',
        fontSize: 28,
        color: color.primary,
        marginBottom: 20,
        marginTop: 20,
        marginRight: 10
    },
    input: {
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        fontSize: 20,
        height: 40,
        marginBottom: 20
    },
    block: {
        marginTop: 20
    }
})

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync
        );
}

function createNotification() {
    return {
        title: 'Start a quiz',
        body: 'Don´t forget to start a quiz for today!',
        ios: {
            sound: true,
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                askAsync(NOTIFICATIONS)
                    .then(({status}) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()
                                .catch(error => {
                                    console.log(error.message)
                                })

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(12)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day'
                                }
                            ).catch(error => {
                                console.log(error.message)
                            })

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                                .catch(error => {
                                    console.log(error.message)
                                })
                        }
                    })
            }
        })
        .catch(error => {
            console.log(error.message)
        })
}






