import React, { Component } from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import {FormLabel, FormInput, Text} from 'react-native-elements'
import {connect} from 'react-redux'
import {Card, Button} from 'react-native-elements'
import {addCardToDeck} from '../utils/api'
import {addCard} from '../actions'

class AddQuestion extends Component {
  state = {
    question: "",
    answer: null
  }

  handleChange = (value) => {
    this.setState({
      question: value
    })
  }

  handleSubmit = () => {
    const title = this.props.navigation.state.params.title
    if (this.state.question !== "" && this.state.answer !== null) {
      const card = this.state
      addCardToDeck(title, card).then(()=> {
        this.props.dispatch(addCard(title, card))
        this.setState({
          question: "",
          answer: null
        })
      }).then(()=>{this.props.navigation.goBack()})
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}  behaviour="padding">

          <FormLabel>Enter you Question</FormLabel>
          <View style={{width: '85%', margin: 15}}>
            <FormInput
            onChangeText={this.handleChange}
            value={this.state.question}/>
          </View>
          <FormLabel>Select your Answer</FormLabel>
          <Text h3 style={{marginTop: 5}}>{this.state.answer!==null?`${this.state.answer}`: ""}</Text>
          <View style={{flexDirection: 'row', marginTop: 30}}>
          <View style={{width: '35%', marginRight: '5%'}}>
          <Button
              raised
              icon={{name: 'ios-checkmark',md: 'md-checkmark', type: 'ionicon', size: 35}}
              title='True'
              backgroundColor='#00E676'
              borderRadius={30}
              fontSize={18}
              onPress={() => {this.setState({answer: true})}}
              fontWeight="500"/>
          </View>
            <View style={{width: '35%', marginLeft: '5%'}}>
           <Button
               raised
               icon={{name: 'ios-close', type: 'ionicon', size: 35}}
               title='False'
               backgroundColor='#FF5252'
               borderRadius={30}
               onPress={() => {this.setState({answer: false})}}
               fontSize={18}
               fontWeight="500"/>
               </View>
          </View>

          <View style={{marginTop: 30}}>
          <Button
              raised
              icon={{name: 'ios-paper-plane', type: 'ionicon', size: 35}}
              title='Submit'
              backgroundColor='#397af8'
              borderRadius={30}
              onPress={this.handleSubmit} />
          </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '20%',
  },
});


export default connect()(AddQuestion)
