import PropTypes from 'prop-types';
import React from 'react';
import { Image, TouchableOpacity, ViewPropTypes, StyleSheet } from 'react-native';
import { ImagePicker, Permissions } from 'expo';

let CameraIcon = require('../images/camera.png');

export default class ImagePickerExt extends React.Component {
  state = {
    image: null,
  };

  componentDidMount () {
    this._requestCameraPermision();
    this._requestCameraRollPermision();
  }  

  render() {
    let { image } = this.state;

    return (
      <TouchableOpacity
            style={ this.props.containerStyle }
            onPress={() => {
              this._pickImage();
            }}
            accessibilityTraits="button"
          >  
        <Image
          source={ CameraIcon }
          style={[ styles.iconStyle, this.props.iconStyle ]}
        />
      </TouchableOpacity>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);
    
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.props.onSelect(result.uri)
    }
  };

  _requestCameraPermision = async () => {
    let status = await Permissions.askAsync(Permissions.CAMERA);

    console.log('camera: ' + JSON.stringify(status));
  }

  _requestCameraRollPermision = async () => {
    let status_roll = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    console.log('roll: '+ JSON.stringify(status_roll));
  }
}

const styles = StyleSheet.create({
  iconStyle: { 
    width: 28, 
    resizeMode: 'contain' 
  }
});

ImagePickerExt.defaultProps = {
  onSelect: () => {},
  iconStyle: {},
  containerStyle: {}
};

ImagePickerExt.propTypes = {
  onSelect: PropTypes.func,
  iconStyle: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style
};
