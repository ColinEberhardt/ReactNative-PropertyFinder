'use strict';

var React = require('react-native');
import CustomNavigator from './Navigator';

class PropertyFinderApp extends React.Component {
  render() {
    return <CustomNavigator />;
  }
}

React.AppRegistry.registerComponent('PropertyFinder', function () {
  return PropertyFinderApp
});
