import React from 'react'
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import RadioScreen from '../screens/RadioScreen'
import PodcastsScreen from '../screens/PodcastsScreen'
import MoreInfoScreen from '../screens/MoreInfoScreen'
import ContactScreen from '../screens/ContactScreen';
import ThanksScreen from '../screens/ThanksScreen';
import Colors from '../constants/Colors';
import PostsScreen from '../screens/PostsScreen';
import PostScreen from '../screens/PostScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import CommentsScreen from '../screens/CommentsScreen';
import TabBar from '../components/TabBar';
import LinearGradient from 'react-native-linear-gradient';
import BackButton from '../components/BackButton';
import WordpressPageScreen from '../screens/WordpressPageScreen';


const PodcastsStack = createStackNavigator({
    Podcasts: PodcastsScreen,
    Podcast: {
        screen: PostScreen,
        navigationOptions: () => ({
            title: 'Podcast',
        })
    },
    Comments: CommentsScreen
},
    {
        defaultNavigationOptions: ({ navigation }) => ({
            headerLeft: <BackButton {...navigation}/>,
            headerBackground: (
                <LinearGradient
                    colors={[Colors.podcasts, '#df671d']}
                    style={{ flex: 1 }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                />
            ),
            headerTintColor: '#fff',
        })
    })

const PostsStack = createStackNavigator({
    Posts: PostsScreen,
    Post: {
        screen: PostScreen,
        navigationOptions: () => ({
            title: 'Article'
        })
    },

    Comments: CommentsScreen
},
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerLeft: <BackButton {...navigation}/>,
            headerBackground: (
                <LinearGradient
                    colors={[Colors.actus, '#9e050d']}
                    style={{ flex: 1 }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                />
            ),
            headerTintColor: '#fff',
        })
    })

const MoreInfoStack = createStackNavigator({
    MoreInfoScreen: {
        screen:MoreInfoScreen,
        navigationOptions: () => ({
            headerLeft: null
        })
    },
    EditProfile: EditProfileScreen,
    Wordpress:WordpressPageScreen
},
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerLeft: <BackButton {...navigation}/>,
            headerBackground: (
                <LinearGradient
                    colors={[Colors.options, '#154078']}
                    style={{ flex: 1 }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                />
            ),
            headerTitleStyle: {
                color: 'white'
            },
            headerTintColor: '#fff',
            headerBackTitle: null,

        })
    })

const MainNavigator = createBottomTabNavigator(
    {
        Radio: RadioScreen,
        Podcasts: PodcastsStack,
        Actus: PostsStack,
        MoreInfo: MoreInfoStack,
    },
    {
        tabBarComponent: TabBar,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: Colors.tabIconActive,
            inactiveTintColor: Colors.tabIconInactive,
            style: {
                backgroundColor: Colors.tabBar,
            }
        },
    }
)

const AppNavigator = createAppContainer(MainNavigator)

export default AppNavigator