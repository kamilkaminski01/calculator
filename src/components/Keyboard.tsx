import { useState } from 'react'
import { View, Text } from 'react-native'
import { Styles } from 'styles/GlobalStyles'
import Button from './Button'
import { Colors } from 'styles/Colors'

export default function Keyboard() {
  const [firstNumber, setFirstNumber] = useState('')
  const [secondNumber, setSecondNumber] = useState('')
  const [operation, setOperation] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const [showAdvancedOperations, setShowAdvancedOperations] = useState(false)

  const handleNumberPress = (buttonValue: string) => {
    if (firstNumber.length < 10) {
      setFirstNumber(firstNumber + buttonValue)
    }
  }

  const handleOperationPress = (buttonValue: string) => {
    setOperation(buttonValue)
    setSecondNumber(firstNumber)
    setFirstNumber('')
  }

  const handleSquareRoot = () => {
    clear()
    const squareRootResult = Math.sqrt(parseInt(firstNumber)).toString()
    const fifthDecimalIndex = squareRootResult.indexOf('.') + 5
    const truncatedResult = squareRootResult.slice(0, fifthDecimalIndex)
    setResult(parseFloat(truncatedResult))
  }

  const handleCubeRoot = () => {
    clear()
    const squareRootResult = Math.cbrt(parseInt(firstNumber)).toString()
    const fifthDecimalIndex = squareRootResult.indexOf('.') + 5
    const truncatedResult = squareRootResult.slice(0, fifthDecimalIndex)
    setResult(parseFloat(truncatedResult))
  }

  const handlePowerOf = (powerOf: number) => {
    clear()
    const result = Math.pow(parseInt(firstNumber), powerOf)
    setResult(result)
  }

  const handleLog = () => {
    clear()
    const result = Math.log(parseInt(firstNumber)).toString()
    const fifthDecimalIndex = result.indexOf('.') + 5
    const truncatedResult = result.slice(0, fifthDecimalIndex)
    setResult(parseFloat(truncatedResult))
  }

  const clear = () => {
    setFirstNumber('')
    setSecondNumber('')
    setOperation('')
    setResult(null)
  }

  const getResult = () => {
    switch (operation) {
      case '+':
        clear()
        setResult(parseInt(secondNumber) + parseInt(firstNumber))
        break
      case '-':
        clear()
        setResult(parseInt(secondNumber) - parseInt(firstNumber))
        break
      case '*':
        clear()
        setResult(parseInt(secondNumber) * parseInt(firstNumber))
        break
      case '/':
        clear()
        setResult(parseInt(secondNumber) / parseInt(firstNumber))
        break
      case '%':
        clear()
        setResult(parseInt(secondNumber) % parseInt(firstNumber))
        break
      default:
        clear()
        setResult(0)
        break
    }
  }

  const displayFirstNumber = () => {
    if (result !== null) {
      return (
        <Text
          style={
            result < 99999
              ? [Styles.screenFirstNumber, { color: Colors.result }]
              : [Styles.screenFirstNumber, { fontSize: 50, color: Colors.result }]
          }>
          {result?.toString()}
        </Text>
      )
    }
    if (firstNumber && firstNumber.length < 6) {
      return <Text style={Styles.screenFirstNumber}>{firstNumber}</Text>
    }
    if (firstNumber === '') {
      return <Text style={Styles.screenFirstNumber}>{'0'}</Text>
    }
    if (firstNumber.length > 5 && firstNumber.length < 8) {
      return <Text style={[Styles.screenFirstNumber, { fontSize: 70 }]}>{firstNumber}</Text>
    }
    if (firstNumber.length > 7) {
      return <Text style={[Styles.screenFirstNumber, { fontSize: 50 }]}>{firstNumber}</Text>
    }
  }

  return (
    <View style={Styles.viewBottom}>
      <View
        style={{
          height: 120,
          width: '90%',
          justifyContent: 'flex-end',
          alignSelf: 'center'
        }}>
        <Text style={Styles.screenSecondNumber}>
          {secondNumber}
          <Text style={{ color: 'purple', fontSize: 50, fontWeight: '500' }}>{operation}</Text>
        </Text>
        {displayFirstNumber()}
      </View>
      <View style={Styles.row}>
        <Button
          title="A"
          isGray
          onPress={() => setShowAdvancedOperations(!showAdvancedOperations)}
        />
        <Button title="C" isGray onPress={clear} />
        {showAdvancedOperations ? (
          <Button title="x²" isBlue onPress={() => handlePowerOf(2)} />
        ) : (
          <Button title="√" isBlue onPress={handleSquareRoot} />
        )}
        {showAdvancedOperations ? (
          <Button title="x³" isBlue onPress={() => handlePowerOf(3)} />
        ) : (
          <Button title="÷" isBlue onPress={() => handleOperationPress('/')} />
        )}
      </View>
      <View style={Styles.row}>
        <Button title="7" onPress={() => handleNumberPress('7')} />
        <Button title="8" onPress={() => handleNumberPress('8')} />
        <Button title="9" onPress={() => handleNumberPress('9')} />
        {showAdvancedOperations ? (
          <Button title="%" isBlue onPress={() => handleOperationPress('%')} />
        ) : (
          <Button title="x" isBlue onPress={() => handleOperationPress('*')} />
        )}
      </View>
      <View style={Styles.row}>
        <Button title="4" onPress={() => handleNumberPress('4')} />
        <Button title="5" onPress={() => handleNumberPress('5')} />
        <Button title="6" onPress={() => handleNumberPress('6')} />
        {showAdvancedOperations ? (
          <Button title="∛" isBlue onPress={handleCubeRoot} />
        ) : (
          <Button title="-" isBlue onPress={() => handleOperationPress('-')} />
        )}
      </View>
      <View style={Styles.row}>
        <Button title="1" onPress={() => handleNumberPress('1')} />
        <Button title="2" onPress={() => handleNumberPress('2')} />
        <Button title="3" onPress={() => handleNumberPress('3')} />
        {showAdvancedOperations ? (
          <Button title="log" isBlue onPress={handleLog} />
        ) : (
          <Button title="+" isBlue onPress={() => handleOperationPress('+')} />
        )}
      </View>
      <View style={Styles.row}>
        <Button title="." onPress={() => handleNumberPress('.')} />
        <Button title="0" onPress={() => handleNumberPress('0')} />
        <Button title="⌫" onPress={() => setFirstNumber(firstNumber.slice(0, -1))} />
        <Button title="=" isBlue onPress={() => getResult()} />
      </View>
    </View>
  )
}
