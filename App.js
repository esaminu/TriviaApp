import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Dimensions,
  Text
} from 'react-native'
var { width, height } = Dimensions.get('window')
import Questions from './src/components/questions'
import {StackNavigator} from 'react-navigation'
import MainScreen from './src/components/mainScreen'


export default StackNavigator({
  Home: {
      screen: MainScreen
  },
  Questions: {
      screen: Questions
  }
},
{
    headerMode: 'none'
})