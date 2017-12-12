import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {connect} from 'react-redux'
import {Card, Button} from 'react-native-elements'

class Quiz extends Component {
  render() {
    return (

        <View style={styles.container}>
          <Text>{this.props.navigation.state.params.title}</Text>
          <Text>{`${this.props.navigation.state.params.deck.questions[0].answer}`}</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '30%',
  },
});


export default Quiz
