import React, {Component} from 'react'
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native'
import {Card} from 'react-native-elements'
import {connect} from 'react-redux'

class DeckMain extends Component {

  renderItem = ({item}) => (<TouchableOpacity onPress={() => this.props.navigation.navigate('DeckDetail', {title: item.title})}>
    <View>
      <Card title={item.title}>
        <Text style={{
            alignSelf: 'center'
          }}>{item.questions.length} {`${item.questions.length === 1 ? 'Card' : 'Cards'}`}</Text>
      </Card>
    </View>
  </TouchableOpacity>)

  _keyExtractor = (item, index) => item.title


  render() {
    const decks = Object.keys(this.props.decks).reduce((acc, deck) => {
      acc.push(this.props.decks[deck])
      return acc
    }, [])

    return (<View style={styles.container}>
      {
        decks.length > 0
          ? <View style={{
                flex: 1,
                alignSelf: 'stretch'
              }}><FlatList data={decks} renderItem={this.renderItem} keyExtractor={this._keyExtractor}/></View>
          : <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1
              }}>
              <Text>{`Create a deck to get started!`}</Text>
            </View>
      }
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const mapStateToProps = (state) => ({decks: state})

export default connect(mapStateToProps)(DeckMain)
