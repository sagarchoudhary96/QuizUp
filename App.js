import React from 'react';
import {StatusBar, View} from 'react-native';
import {TabNavigator, StackNavigator, DrawerNavigator} from 'react-navigation';
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import DeckMain from './components/DeckMain'
import AddDeck from './components/AddDeck'
import AddQuestion from './components/AddQuestion'
import Quiz from './components/quiz'
/* Constant from Expo */
import {Constants} from 'expo'
import decks from './reducers'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {fetchDecks} from './actions'
import {getDecks} from './utils/api'
import DeckDetail from './components/DeckDetail'
import {setLocalNotification} from './utils/helper'

const STORE = createStore(decks)

getDecks().then(result => {
  STORE.dispatch(fetchDecks(result))
})

const CustomStatusBar = ({
  backgroundColor,
  ...props
}) => (<View style={{
    backgroundColor,
    height: Constants.statusBarHeight
  }}>
  <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
</View>)

const StackMain = StackNavigator({
  Decks: {
    screen: DeckMain,
    navigationOptions: {
      title: "QuizUp"
    }
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      title: "Deck Detail"
    }
  },

  AddQuestion: {
    screen: AddQuestion,
    navigationOptions: {
      title: "Add Question"
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: "Quiz Time"
    }
  }
}, {
  cardStyle: {
    backgroundColor: '#fff'
  }
})

const StackAddDeck = StackNavigator({
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      title: "Add New Deck"
    }
  }
}, {
  cardStyle: {
    backgroundColor: '#fff'
  }
})

const Tabs = TabNavigator({
  Decks: {
    screen: StackMain,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({tintColor}) => <Ionicons name="ios-home" size={30} color={tintColor}/>
    }
  },
  AddDeck: {
    screen: StackAddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({tintColor}) => <FontAwesome name="plus-square" size={30} color={tintColor}/>
    }
  }
})

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (<Provider store={STORE}>
      <View style={{
          flex: 1
        }}>
        <CustomStatusBar backgroundColor="#f5f5f5" barStyle="dark-content"/>
        <Tabs/>
      </View>
    </Provider>);
  }
}
