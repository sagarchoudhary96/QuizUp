import React, {Component} from 'react'
import {StyleSheet, View, KeyboardAvoidingView} from 'react-native'
import {FormLabel, FormInput} from 'react-native-elements'
import {connect} from 'react-redux'
import {Card, Button} from 'react-native-elements'
import {saveDeckTitle} from '../utils/api'
import {addDeck} from '../actions'

class AddDeck extends Component {

  state = {
    deck_title: ""
  }

  handleChange = (value) => {
    this.setState({deck_title: value})
  }

  handleSubmit = () => {
    const title = this.state.deck_title
    {(title !== "") && saveDeckTitle(title).then(() => {
      this.props.dispatch(addDeck(title))
      this.setState({deck_title: ""})
    }).then(()=>this.props.navigation.navigate('DeckDetail', {title: title}))}
  }

  render() {
    return (<KeyboardAvoidingView style={styles.container} behaviour="padding">
      <FormLabel>Enter New Deck Name</FormLabel>
      <View style={{
          width: '85%',
          margin: 25
        }}>
        <FormInput onChangeText={this.handleChange} value={this.state.deck_title} inputStyle={{
            width: '100%'
          }}/>
      </View>
      <View style={{
          marginTop: 25
        }}>
        <Button raised icon={{
            name: 'repo',
            type: 'octicon'
          }} title='Create Deck' backgroundColor='#397af8' borderRadius={24} onPress={this.handleSubmit}/>
      </View>
    </KeyboardAvoidingView>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '30%'
  }
});

export default connect()(AddDeck)
