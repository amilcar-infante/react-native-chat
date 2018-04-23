import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
let CheckIcon = require('../images/check.png');

export default class HeaderCenter extends React.Component {
  render() {
    return (
      <View style={ styles.base }>
        <Image
          source={ this.props.headerIcon }
          style={{ width: 120, resizeMode: 'contain' }}
        />
        <Text style={styles.bodyText}>
          <Text>
            { this.props.bodyText }
          </Text>
          {
            this.props.bodyText ?
              <Image
                source={ CheckIcon }
                style={{ width: 12, height: 12, resizeMode: 'contain', marginBottom: -5}}
              /> :
              null
          }
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    marginTop: 14,
    flex: 1, 
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  bodyText: {
    fontFamily: 'Cochin',
    textAlign: 'center',
    fontSize: 12,
    position: 'absolute', 
    bottom: -12
  }
});

HeaderCenter.defaultProps = {
  bodyText: '',
  headerIcon: ''
};

HeaderCenter.propTypes = {
  bodyText: PropTypes.string,
  headerIcon: PropTypes.number
};
