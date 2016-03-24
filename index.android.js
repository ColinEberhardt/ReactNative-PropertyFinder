'use strict';

var React = require('react-native');
var SearchPage = require('./SearchPage');

var styles = React.StyleSheet.create({
  container: {
    flex: 1
  }
});

class PropertyFinderApp extends React.Component {
  render() {
    return (
      <React.Navigator
        style={styles.container}
        initialRoute={{name: 'My First Scene', index: 0}}
        renderScene={(route, navigator) => <SearchPage title={route.title} navigator={navigator} />}
      />
    );
  }
}

class HelloWorld extends React.Component {
  render() {
    return <React.Text style={styles.text}>Hello World (Again)</React.Text>;
  }
}

React.AppRegistry.registerComponent('PropertyFinder',
  function() { return PropertyFinderApp });
