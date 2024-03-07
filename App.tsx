import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Switch, SafeAreaView } from 'react-native'
import { ThemeContext } from 'context/ThemeContext'
import { useState } from 'react'
import { Colors } from 'styles/Colors'
import Keyboard from 'components/Keyboard'

export default function App() {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={theme}>
      <SafeAreaView
        style={
          theme === 'light' ? styles.container : [styles.container, { backgroundColor: '#000000' }]
        }>
        <StatusBar style="auto" />
        <Switch
          value={theme === 'light'}
          onValueChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        />
        <Keyboard />
      </SafeAreaView>
    </ThemeContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
})
