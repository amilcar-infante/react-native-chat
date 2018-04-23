import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Composer } from 'react-native-gifted-chat';
import PropTypes from 'prop-types';

let CameraIcon = require('../images/camera.png'),
  AppStoreIcon = require('../images/app-store.png'),
  MicrophoneIcon = require('../images/microphone.png'),
  UpArrowIcon = require('../images/up-arrow.png');

export default class ComposerOverride extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputIcon: MicrophoneIcon,
      text: ''
    }
  }

  onTextChanged (text) {
    let state = {
      text: text
    }

    if ( text.length === 1 ) {
      state.inputIcon = UpArrowIcon
    } else if ( text.length === 0 ) {
      state.inputIcon = MicrophoneIcon
    }

    this.setState(state)
    
  }

  onSend () {
    this.props.onSend({ text: this.state.text.trim() }, true);
    this.setState({
      text: ''
    })
  }


  render() {
    return (
      <View style={ styles.baseStyles }> 
        <Image
          source={ CameraIcon }
          style={ styles.cameraIconStyles }
        />
        <Image
          source={ AppStoreIcon }
          style={ styles.appStoreIconStyles }
        />
        <View>
          <Composer {...this.props} placeholder='To: Marriott' text={ this.state.text }
            textInputStyle={ styles.composerStyles }
            onTextChanged={ this.onTextChanged.bind(this) } />
          <TouchableOpacity
            style={ styles.containerStyles }
            onPress={() => {
              this.onSend();
            }}
            accessibilityTraits="button"
          >
            <Image
              source={ this.state.inputIcon }
              style={ styles.sendIconStyles }
              onclick={ this.props.onSend.bind(this) }
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  baseStyles: { 
    flex: 1, 
    flexDirection: 'row'
  },
  cameraIconStyles: { 
    width: 28, 
    resizeMode: 'contain', 
    marginLeft: 12, 
    paddingBottom: 10 
  },
  appStoreIconStyles: { 
    width: 28, 
    resizeMode: 'contain', 
    marginLeft: 12, 
    paddingBottom: 12 
  },
  composerStyles: { 
    width: 270, 
    paddingLeft: 5, 
    paddingTop: 6,
    borderWidth: 2, 
    borderColor: '#eae9ef', 
    borderRadius: 20, 
    fontSize: 16,
    lineHeight: 16,
    marginTop: 8,
    marginBottom: 10,
    marginRight: 0,
    marginLeft: 10
  },
  containerStyles: {
    height: 26,
    position: 'absolute', 
    top: 0, 
    right: 6
  },
  sendIconStyles: { 
    width: 26, 
    resizeMode: 'contain'  
  }
});

ComposerOverride.defaultProps = {
  onSend: () => {}
};

ComposerOverride.propTypes = {
  onSend: PropTypes.func
};
