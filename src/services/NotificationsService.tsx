import PushNotification from 'react-native-push-notification'
import WordpressAPIService from './WordpressAPIService';


const PushNotificationService = {
    configure: (onNotification) => {
        PushNotification.configure({
            onRegister: (token) => {
                WordpressAPIService.registerForNotifications(token)
            },
            onNotification: onNotification,
            senderID: "303713950377",

            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            popInitialNotification: true,
            requestPermissions: true,
        });
    },

    localNotification: () => {
        PushNotification.localNotification({
            /* Android Only Properties */
            ticker: "My Notification Ticker", // (optional)
            autoCancel: true, // (optional) default: true
            largeIcon: "dvrgv", // (optional) default: "ic_launcher"
            smallIcon: "dvrgv", // (optional) default: "ic_notification" with fallback for "ic_launcher"
            bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
            subText: "This is a subText", // (optional) default: none
            color: "red", // (optional) default: system default
            vibrate: true, // (optional) default: true
            vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            tag: 'some_tag', // (optional) add tag to message
            group: "group", // (optional) add group to message
            ongoing: false, // (optional) set whether this is an "ongoing" notification

            /* iOS only properties */

            /* iOS and Android properties */
            title: "Nouvelle notification", // (optional)
            message: "My f*** Notification Message", // (required)
            category: 'lala',
            userInfo: {
                title: 'oui'
            },
            playSound: true, // (optional) default: true
            soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
            number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
            actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
        });
    }
}

export default PushNotificationService