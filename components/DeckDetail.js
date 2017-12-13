import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text, Button } from 'react-native-elements'
import {connect} from 'react-redux'


class DeckDetail extends Component {

  render() {
    return (
      <View style={styles.container}>
         <Text h2> {this.props.deck.title} </Text>
         <Text h4> { `${this.props.deck.questions.length} cards` }</Text>
         {this.props.deck.questions.length > 0 && <Button
             raised
             icon={{name: 'ios-flash', type: 'ionicon', size: 25}}
             title='Start Quiz'
             backgroundColor='#FF5252'
             borderRadius={50}
             onPress={()=>this.props.navigation.navigate('Quiz', {title: this.props.deck.title, deck: this.props.deck})}
             fontSize={18}
             fontWeight="500"/>}

          <Button
              raised
              icon={{name: 'plus', type: 'font-awesome', size: 25}}
              title='Add Question'
              backgroundColor='#2196F3'
              borderRadius={50}
              onPress={()=>this.props.navigation.navigate('AddQuestion',{title: this.props.deck.title})}
              fontSize={18}
              fontWeight="500"/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 100
  },
});

const mapStateToProps = (state, { navigation }) => ({
  deck: state[navigation.state.params.title]
})

export default connect(mapStateToProps)(DeckDetail)
