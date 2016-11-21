import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import App from './js/components/app'

export default class RNArgonjsStarterKit extends Component {
  render() {
    return (
      <App />
    )
  }
}

AppRegistry.registerComponent('RNArgonjsStarterKit', () => RNArgonjsStarterKit)
