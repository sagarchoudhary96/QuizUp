import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import {connect} from 'react-redux'
import {Card, Button, Text} from 'react-native-elements'
import {NavigationActions} from 'react-navigation'

class Quiz extends Component {

  state = {
    correct: 0,
    incorrect: 0,
    skipped: 0,
    showAnswer: false,
    total: this.props.navigation.state.params.deck.questions.length,
    current: 0,
    questions: this.props.navigation.state.params.deck.questions
  }

  handleSkip = () => {
    const skipCount = this.state.skipped
    const current = this.state.current
    this.setState({
      skipped: skipCount + 1,
      current: current + 1,
      showAnswer: false
    })
  }

  handleAnswer = (ans) => {
    let correctCount = this.state.correct
    let incorrectCount = this.state.incorrect
    const current = this.state.current
    const currentAns = this.state.questions[current].answer
    ans === currentAns
      ? correctCount += 1
      : incorrectCount += 1
    this.setState({
      correct: correctCount,
      incorrect: incorrectCount,
      current: current + 1
    })
  }

  render() {
    const currentQuesNo = this.state.current + 1
    const leftQuestionNo = this.state.total - currentQuesNo
    const totalQues = this.state.total

    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({routeName: 'DecksList'}),
        NavigationActions.navigate({
          routeName: 'Quiz',
          params: {
            title: this.props.navigation.state.params.deck.title,
            deck: this.props.navigation.state.params.deck
          }
        })
      ]
    })

    return (<View style={styles.container}>
      {
        currentQuesNo <= totalQues
          ? <View style={{
                alignItems: 'center',
                justifyContent: 'space-around'
              }}>
              <Text h4>Question {currentQuesNo}
                ({`${leftQuestionNo} left`})</Text>
              <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>

                <Text style={{
                    fontSize: 22,
                    fontWeight: '300'
                  }}>
                  <Text style={{
                      fontSize: 22,
                      fontWeight: '400'
                    }}>Q:
                  </Text>{this.state.questions[currentQuesNo - 1].question}</Text>
              </View>

              {
                !this.state.showAnswer
                  ? <View style={{
                        flexDirection: 'row',
                        flex: 2,
                        alignItems: 'center'
                      }}>
                      <View style={{
                          width: '35%',
                          marginRight: '5%'
                        }}>
                        <Button raised icon={{
                            name: 'ios-checkmark',
                            md: 'md-checkmark',
                            type: 'ionicon',
                            size: 35
                          }} title='True' backgroundColor='#00E676' borderRadius={30} fontSize={18} onPress={() => {
                            this.handleAnswer(true)
                          }} fontWeight="500"/>
                      </View>
                      <View style={{
                          width: '35%',
                          marginLeft: '5%'
                        }}>
                        <Button raised icon={{
                            name: 'ios-close',
                            type: 'ionicon',
                            size: 35
                          }} title='False' backgroundColor='#FF5252' borderRadius={30} onPress={() => {
                            this.handleAnswer(false)
                          }} fontSize={18} fontWeight="500"/>
                      </View>
                    </View>
                  : <View>
                      <Text h3>{`${this.state.questions[currentQuesNo - 1].answer}`}</Text>
                    </View>
              }

              <View style={{
                  width: '100%',
                  flex: 1.2,
                  flexDirection: 'column',
                  justifyContent: 'space-around'
                }}>
                {
                  !this.state.showAnswer && <View>
                      <Button raised title="Show Answer" large backgroundColor='#FF7043' borderRadius={5} fontSize={20} fontWeight="500" onPress={() => {
                          this.setState({showAnswer: true})
                        }}/>
                    </View>
                }

                <View>
                  <Button raised title="Skip Question" large backgroundColor='#0277BD' borderRadius={5} fontSize={20} fontWeight="500" onPress={this.handleSkip}/>
                </View>
              </View>
            </View>
          : <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <View style={{
                  flex: 0.4,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 30
                }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    flexDirection: 'row'
                  }}>
                  <Text style={{
                      color: '#81d135',
                      fontSize: 25,
                      fontWeight: '700'
                    }}>
                    CORRECT:
                  </Text>
                  <Text style={{
                      color: '#81d135',
                      fontSize: 25,
                      fontWeight: '100'
                    }}>
                    {`${this.state.correct}`}
                  </Text>
                </View>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    flexDirection: 'row'
                  }}>
                  <Text style={{
                      color: '#e74c3c',
                      fontSize: 25,
                      fontWeight: '700'
                    }}>
                    INCORRECT:
                  </Text>
                  <Text style={{
                      color: '#e74c3c',
                      fontSize: 25,
                      fontWeight: '100'
                    }}>
                    {`${this.state.incorrect}`}
                  </Text>
                </View>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    flexDirection: 'row'
                  }}>
                  <Text style={{
                      color: '#2c3e50',
                      fontSize: 25,
                      fontWeight: '700'
                    }}>
                    SKIPPED:
                  </Text>
                  <Text style={{
                      color: '#2c3e50',
                      fontSize: 25,
                      fontWeight: '100'
                    }}>
                    {`${this.state.skipped}`}
                  </Text>
                </View>
              </View>

              <View style={{
                  flex: 0.2,
                  justifyContent: 'flex-end',
                  alignItems: 'center'
                }}>
                <Button raised large backgroundColor='#4DB6AC' borderRadius={5} fontSize={20} fontWeight="500" title="Go to Deck" onPress={() => {
                    this.props.navigation.goBack()
                  }}/>
              </View>
              <View style={{
                  flex: 0.2,
                  justifyContent: 'flex-end',
                  alignItems: 'center'
                }}>
                <Button raised large backgroundColor='#0288D1' borderRadius={5} fontSize={20} fontWeight="500" title="Restart Quiz" onPress={() => {
                    this.props.navigation.dispatch(resetAction)
                  }}/>
              </View>
            </View>
      }
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 20
  }
});

export default Quiz
