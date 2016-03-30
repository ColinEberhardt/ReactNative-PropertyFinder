/**
 * Created by NFIB on 3/28/16.
 */
import React from 'react-native';
import SearchPage from './SearchPage';

var styles = React.StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:(React.Platform.OS == 'ios' ? 64 : 56),
  },
  navBar: {
    backgroundColor:'#CCC',
    borderBottomColor:'#333',
    borderBottomWidth:1
  },
  navTextBack: {
    top:22,
    fontSize:12,
    fontWeight:'bold',
  },
  navText: {
    top:15,
    fontSize:16,
    fontWeight:'bold',
  }
});

var _navigator; // we fill this up upon on first navigation.

React.BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
    return false;
  }
  _navigator.pop();
  return true;
});

export default class CustomNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.initRoute = { title: 'Property Finder', component: SearchPage, };
    this.routeMapper = {
      LeftButton: (route, navigator, index, navState) => {
        if (index === 0) {
          return null
        }
        const previousRoute = navState.routeStack[index - 1];
        return (
          <React.TouchableOpacity
            onPress={() => navigator.pop()} style={styles.navBack}>
            <React.Text style={styles.navTextBack}>
              {previousRoute.title}
            </React.Text>
          </React.TouchableOpacity>
        )
      },
      RightButton: (route, navigator, index, navState) => {
        if (route.rightElement) {
          return route.rightElement
        }
      },
      Title: (route, navigator, index, navState) => {
        return (
          <React.Text style={styles.navText}>{route.title}</React.Text>
        )
      }
    };

    this.renderScene = (route, navigator) => {
      _navigator = navigator;
      if (route.component) {
        return React.createElement(route.component, { navigator, ...route.passProps });
      }
    };

    this.configScene = () => {
      return React.Navigator.SceneConfigs.FloatFromRight;
    };
  }

  render() {
    return (
    // React.Platform.OS == 'ios' ?
    //   (<React.NavigatorIOS
    //     style={styles.container}
    //     initialRoute={this.initRoute} />) :
      (<React.Navigator
        style={styles.container}
        initialRoute={this.initRoute}
        configureScene={this.configScene}
        renderScene={this.renderScene}
        navigationBar={ <React.Navigator.NavigationBar style={styles.navBar} routeMapper={this.routeMapper} /> }
      />));
  }
}