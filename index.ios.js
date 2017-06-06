/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  ListView,
  View
} from 'react-native';


var REQUEST_URL = 'https://api.myjson.com/bins/15yy8t';

export default class Moviez extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

    componentDidMount() {
      this.fetchData();
    }

    fetchData() {
      fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
            loaded: true,
          });
        })
        .done();
    }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.ListView} />
    );

  }
    
  /*  var movie = this.state.movies[0];
    return this.renderMovie(movie);
  } */

  renderLoadingView() {
    return (
      <View style={styles.container}>
      <Text>
        Loading movies..
      </Text>
    </View>
    );
  }

  renderMovie(movie) {
    return (
      <View style={styles.container}>
          <Image source={{uri: movie.posters.thumbnail}} style={styles.thumbnail} />
        <View style={styles.rightContainer}>
          <Text>{movie.title}</Text>
          <Text>{movie.year}</Text>
        </View>
      </View>
    );
  }
}  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
    title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center'
  },
  year: {
    textAlign: 'center'
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  ListView: {
    paddingTop: 20,
  }
});

AppRegistry.registerComponent('Moviez', () => Moviez);
