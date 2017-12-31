import firebase from 'firebase'
import React, { Component } from 'react'
import { View } from 'react-native'
import { Header, Button, CardSection, Spinner } from './components/common'
import LoginForm from './components/LoginForm'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: null,
    }
  }
  componentDidMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBNm2ir-NDekMmfumSY7SqUBZt-F2vuzok',
      authDomain: 'auth2-50f33.firebaseapp.com',
      databaseURL: 'https://auth2-50f33.firebaseio.com',
      projectId: 'auth2-50f33',
      storageBucket: 'auth2-50f33.appspot.com',
      messagingSenderId: '446343813737',
    })
    firebase.auth().onAuthStateChanged(user => {
      user
        ? this.setState({ loggedIn: true })
        : this.setState({ loggedIn: false })
    })
  }
  renderContent() {
    if (this.state.loggedIn === null)
      return (
        <CardSection>
          <Spinner />
        </CardSection>
      )
    return this.state.loggedIn ? (
      <CardSection>
        <Button onPress={() => firebase.auth().signOut()}>Logout</Button>
      </CardSection>
    ) : (
      <LoginForm firebase={firebase} />
    )
  }
  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    )
  }
}
