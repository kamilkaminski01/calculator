import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Switch } from 'react-native'
import { ThemeContext } from 'context/ThemeContext'
import { useState } from 'react'
import { Colors } from 'styles/Colors'

export default function App() {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={theme}>
      <View
        style={
          theme === 'light' ? styles.container : [styles.container, { backgroundColor: '#000000' }]
        }>
        <StatusBar style="auto" />
        <Switch
          value={theme === 'light'}
          onValueChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        />
      </View>
    </ThemeContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
