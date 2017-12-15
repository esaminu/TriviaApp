import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    Dimensions,
    Text,
    ScrollView
  } from 'react-native'
import RadioForm from 'react-native-simple-radio-button'
var { width, height } = Dimensions.get('window')

  export default class Questions extends Component {

    state = {
        questions: [],
        done: false

    }

    getQuestions = () => {
        return fetch('https://opentdb.com/api.php?amount=10')
                .then(res => res.json())
                .then(res => {
                    this.setState({questions: res.results})
                })
    }
    
    componentWillMount() {
        this.getQuestions();
    }

    render() {
        console.log(this.state.questions)
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            {!this.state.done ? 
                <ScrollView>
                    {this.state.questions.map((question,i) => (
                        <Question type={question.type} 
                        key={i}
                        question={question.question}
                        answers={question.incorrect_answers.concat(question.correct_answer)}
                        onAnswer={value => {
                            if(question.incorrect_answers.concat(question.correct_answer)[value] == question.correct_answer){
                                this.setState({questions: [
                                    ...this.state.questions.slice(0,i),
                                    {...this.state.questions[i], answer: true},
                                    ...this.state.questions.slice(i+1)
                                    ]})
                            } else {
                                this.setState({questions: [
                                    ...this.state.questions.slice(0,i),
                                    {...this.state.questions[i], answer: false},
                                    ...this.state.questions.slice(i+1)
                                    ]})
                            }
                        }}/>
                    ))}
                    <TouchableOpacity style={ styles.button } onPress={()=>this.setState({done: true})}>
                        <Text>Show Results</Text>
                    </TouchableOpacity> 
                </ScrollView> :
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Text style={{fontSize:25, color:'black',paddingBottom:10}}>
                    You got 
                    {' ' + this.state.questions.filter(question => question.answer).length + ' '}
                    out of 10 points!
                    </Text>
                    <TouchableOpacity style={ styles.button } onPress={()=>{
                        this.getQuestions()
                        this.setState({done: false})
                    }}>
                        <Text>Play Again!</Text>
                    </TouchableOpacity> 
                </View> 
            }
            </View>    
        )
    }
  }

  const Question = ({type, answers, question, onAnswer}) => (
    <View style={{padding:20}}>
        <Text style={{fontSize:20, color:'black',paddingBottom:10}}>{question}</Text>
        <RadioForm
          radio_props={answers.map((label,value) => { return {label, value} })}
          onPress={(value) => {console.log(value)}}
          style={{alignItems: 'flex-start'}}
          onPress={value => onAnswer(value)}
        />
    </View>
  )


  var styles = {
    button: {
      height: 0.07 * height, 
      margin: 10,
      width: 0.5 * width, 
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center'
    }
  }