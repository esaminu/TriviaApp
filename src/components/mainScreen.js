import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    Dimensions,
  } from 'react-native'
  var { width, height } = Dimensions.get('window')

export default class MainScreen extends Component {
    render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <TouchableOpacity style={ styles.button } onPress={()=>navigate('Questions')}>
            <Text>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

var styles = {
    button: {
      height: 0.1 * height, 
      width: 0.5 * width, 
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }