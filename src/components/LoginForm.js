import React, { Component } from 'react'
import firebase from 'firebase'
import { View, TextInput, Text } from 'react-native'
import { Button, Card, CardSection, Input, Spinner } from './common'

export default class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false,
    }
    this.onLoginFail = this.onLoginFail.bind(this)
    this.onLoginSuccess = this.onLoginSuccess.bind(this)
  }
  onButtonPress() {
    const { email, password } = this.state
    this.setState({ error: '', loading: true })
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess)
      .catch(err => {
        console.log('loginFailed', err)
        return firebase.auth().createUserWithEmailAndPassword(email, password)
      })
      .then(this.onLoginSuccess)
      .catch(err => {
        console.log('AuthFailed', err)
        this.onLoginFail()
      })
  }
  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false,
    })
  }
  onLoginFail() {
    this.setState({
      error: 'Authentication failed.',
      loading: false,
    })
  }
  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="e.g user@gmail.com"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>
        <CardSection>
          <Input
            placeholder="password"
            label="Passoword"
            value={this.state.password}
            secureTextEntry
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>
        <Text style={style.errorTextStyle}>{this.state.error}</Text>
        <CardSection>
          {this.state.loading ? (
            <Spinner />
          ) : (
            <Button onPress={this.onButtonPress.bind(this)}>Login</Button>
          )}
        </CardSection>
      </Card>
    )
  }
}

const style = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
}
