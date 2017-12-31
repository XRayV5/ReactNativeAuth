import React from 'react'
import { TextInput, View, Text } from 'react-native'

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
}) => {
  const { input, labelStyle, container } = styles
  return (
    <View style={container}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        value={value}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        onChangeText={onChangeText}
        style={input}
        autoCorrect={false}
        underlineColorAndroid="transparent"
      />
    </View>
  )
}

const styles = {
  input: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    lineHeight: 23,
    flex: 2,
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1,
  },
  container: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
}

export { Input }
