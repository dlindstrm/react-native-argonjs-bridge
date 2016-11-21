/**
 * React Native Argonjs Starter kit
 * https://github.com/dlindstrm/react-native-argonjs-bridge
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  NativeModules,
  StyleSheet
} from 'react-native'
import Camera from 'react-native-camera'
import WebViewBridge from 'react-native-webview-bridge'
import { INJECT_SCRIPT } from '../injectScript'
import { KEY_FOV } from '../constants'

const FOVManager = NativeModules.FOVComponent || NativeModules.FOVModule

export default class App extends Component {
  constructor(props) {
    super(props)
    this.webview = null
    this._onMessage = this._onMessage.bind(this)
    this._sendMessage = this._sendMessage.bind(this)
    this._getFOV = this._getFOV.bind(this)
  }

  render() {
    return(
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.camera}
        aspect={Camera.constants.Aspect.fill}>
        <WebViewBridge
          ref={webview => { this.webview = webview }}
          javaScriptEnabled={true}
          onBridgeMessage={this._onMessage}
          injectedJavaScript={INJECT_SCRIPT}
          source={{uri: 'https://johankasperi.github.io/argon-three-starterkit/'}}
          style={styles.webview}
        />
      </Camera>
    )
  }

  _onMessage(msg) {
    console.log(msg)
    const decodedMsg = JSON.parse(msg)
    switch (decodedMsg.method) {
      case "initialized":
        this._getFOV()
        break
    }
  }

  _sendMessage(method, value) {
    if (this.webview) {
      const msg = JSON.stringify({method: method, value: value})
      console.log(msg)
      this.webview.sendToBridge(msg)
    }
  }

  _getFOV() {
    FOVManager.getFOV().then((value) => {
      this._sendMessage(KEY_FOV, value)
    }, (error) => {
      console.log(error)
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    flex: 1
  },
  webview: {
    backgroundColor: 'transparent',
    flex: 1
  }
})
