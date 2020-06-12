import * as React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

// Good explanation!
// https://foxford.ru/wiki/informatika/faktorizatsiya-metodom-ferma
// Основан на поиске таких целых чисел x и y, которые удовлетворяют соотношению x^2+y^2=n, что ведёт к разложению n=(x-y)(x+y).

const factorFerma = (value) => {
  steps = 0;
  x = parseInt(Math.sqrt(value));

  do {
    if (steps == 100000) {
      return null;
    }
    x++;
    steps++;
    res = Math.pow(x, 2) - parseFloat(value);
    resSqrt = parseInt(Math.sqrt(res));
  } while(Math.pow(resSqrt, 2) != res);

  const y = parseInt(Math.sqrt(Math.pow(x, 2) - value));
  const a = x - y;
  const b = x + y;
  return { value, a, b, x, y, steps };
}

export default function App() {
  const [state, setState] = React.useState({
    value: 0,
    a: 0,
    b: 0,
    x: 0,
    y: 0,
    steps: 0,
  })

  const delayedData = React.useRef(debounce((text) => {
    if (parseInt(text) > 0) { 
      setState(factorFerma(parseInt(text)))
    }
  }, 250)).current;

  const onChangeText = text => {
    delayedData(text);
  };

  return (
    <View style={styles.cnt}>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeText}
        placeholder={'Enter your number value'}
        value={state.value}
      />
      <Text>Ваше число: {state.value}</Text>
      <Text>Множник 1: {state.a}</Text>
      <Text>Множник 2: {state.b}</Text>
      <Text>Перший квадрат: {state.x}</Text>
      <Text>Другий квадрат: {state.y}</Text>
      <Text>Кількість кроків: {state.steps}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cnt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textInput: {
    height: 50,
    fontSize: 15,
    backgroundColor: '#ccc',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#999',
    color: '#000',
    textAlign: 'center',
    padding: 20,
  },
});
