/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { store, persistor } from './src/redux/store'
import {  NativeModules, Platform, NetInfo, Alert, StatusBar, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator'
import Player1 from './src/components/Player1'
import { PersistGate } from 'redux-persist/lib/integration/react';
import ErrorContainer from './src/containers/ErrorContainer'
import moment from 'moment'
import momentFR from 'moment/locale/fr'
import NavigationService from './src/services/NavigationService'
import { AirPlayListener } from 'react-native-airplay-btn'
import NotificationsContainer from './src/containers/NotificationsContainer'

moment().locale('fr', momentFR)

if (Platform == 'ios') {
  NativeModules.SettingsManager.settings.AppleLocale // "fr_FR"
}
else {
  NativeModules.I18nManager.localeIdentifier // "fr_FR"

}




type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      airPlayAvailable: null,
      airPlayConnected: null,
    }

    this.airPlayAvailable = AirPlayListener.addListener('airplayAvailable', this.handleAirplayAvailable)
    this.airPlayConnected = AirPlayListener.addListener('airplayConnected', this.handleAirplayConnected)

  }

  componentWillUnmount() {
    this.airPlayConnected.remove();
    this.airPlayAvailable.remove()
  }

  

  handleAirplayAvailable = (devices) => {
    this.setState({
      airPlayAvailable: devices.available
    })
  }

  handleAirplayConnected = (devices) => {
    this.setState({
      airPlayConnected: devices.connected
    })
  }

  render() {
    return (
      <Provider store={store} >
        <PersistGate persistor={persistor}>
          <StatusBar barStyle='light-content' />
          <AppNavigator ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }} />
          <Player1 />
          <NotificationsContainer />
        </PersistGate>
      </Provider>
    );
  }

}

