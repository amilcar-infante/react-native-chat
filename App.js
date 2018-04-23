import React from 'react';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import { Header } from 'react-native-elements';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import HeaderCenter from './js/HeaderCenter';
import ComposerOverride from './js/ComposerOverride';

let HeaderIcon = require('./images/marriott-title.png');

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);

    this.state = {
      messages: [],
      listViewPropSytles: { 
        marginBottom: 35
      }
    }
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'http://www.placecage.com/40/40'
          },
        },
      ],
    });
    console.disableYellowBox = true;

    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  keyboardWillShow() {
    this.setState({
      listViewPropSytles: { 
        marginBottom: 0
      }
    })
  }

  keyboardWillHide() {
    this.setState({
      listViewPropSytles: { 
        marginBottom: 35
      }
    })
  }

  autoReply(message) {
    let messageReply = {
      _id: this.state.messages.length + 1,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'http://www.placecage.com/40/40'
      }
    }

    if ( message.text === 'Hello') {
      messageReply.text =  'What can I do for you?'      
    } else if ( message.text === 'I need your help') {
      messageReply.text =  'Sure, what do you need?'      
    } else if ( message.text === 'I need a new pair of shoes') {
      messageReply.text =  'Do you have something in mind?'      
    }

    if ( messageReply.text ) {
      setTimeout( () => (
        this.setState(previousState => ({
          messages: GiftedChat.append(
            previousState.messages, 
            messageReply
          )
        })
      )), 1000)
    }    
  }

  onSend(messages = []) {
    messages[0].user.name = 'John Doe'
    messages[0].user.avatar = 'http://www.fillmurray.com/40/40'

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))

    this.autoReply(messages[0])
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        textStyle={{
          left: {
            color: 'black'
          },
          right: {
            color: 'white'
          }
        }}
        wrapperStyle={{
          left: {
            backgroundColor: 'lightgrey'
          },
          right: {
            backgroundColor: 'grey'
          }
        }}
      />
    );
  }

  renderComposer (props) {
    return (
      <ComposerOverride {...props } />
    )
  }

  resetDemo () {
    this.setState(previousState => ({
      messages: GiftedChat.append([], previousState.messages[previousState.messages.length - 1]),
    }))
  }

  render () {
    return (
      <View style={ styles.containerStyles }>
        <Header
          outerContainerStyles={ styles.outerContainerStyle }
          placement={ 'center' }
          leftComponent={{ icon: 'arrow-left', color: '#000', type: 'simple-line-icon', size: 20 }}
          centerComponent={  <HeaderCenter bodyText='Marriott' headerIcon={ HeaderIcon } /> }
          rightComponent={{ icon: 'info', color: '#000', type: 'simple-line-icon', size: 22, 
            onPress: this.resetDemo.bind(this, null)}}
        />
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          renderAvatar={ null }
          showUserAvatar={ false }
          showAvatarForEveryMessage={ true }
          renderBubble={ this.renderBubble }
          renderComposer = { this.renderComposer }
          bottomOffset = { -6 }
          containerStyle= {{ height: 80 }}
          listViewProps = { this.state.listViewPropSytles }
          user={{
            _id: 1,
          }}
        />
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  containerStyles: {
    flex: 1
  },
  outerContainerStyle: {
    backgroundColor: 'white', 
    height: 80
  }
});
