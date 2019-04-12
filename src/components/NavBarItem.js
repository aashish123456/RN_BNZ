/**
 * Drawer Navigation sidebar Button
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image } from 'react-native';

class NavBarItem extends Component {
  render() {
    const { iconName, onPress } = this.props;
    return (
      <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => onPress()} >
        <Image style={{ height: 20, width: 20 }} source={iconName} />
      </TouchableOpacity>
    );
  }
}

NavBarItem.propTypes = {
  iconName: PropTypes.any.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default NavBarItem;
