import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Button,
} from 'react-native';
import Footer from './src/components/Footer';
import Form from './src/components/Form';
import ResultCalculation from './src/components/ResultCalculation';
import colors from './src/resources/colors';

function App() {
  const [capital, setCapital] = useState(null);
  const [interest, setInterest] = useState(null);
  const [months, setMonths] = useState(null);
  const [total, setTotal] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (capital && interest && months) calculate();
    else reset();
  }, [capital, interest, months]);

  const calculate = () => {
    reset();
    if (!capital) {
      setErrorMessage('Añade la cantidad a solicitar');
    } else if (!interest) {
      setErrorMessage('Añade el interes del prestamo');
    } else if (!months) {
      setErrorMessage('Selecciona los meses a pagar');
    } else {
      const i = interest / 100;
      const fee = capital / ((1 - Math.pow(i + 1, -months)) / i);
      setTotal({
        monthlyFee: fee.toFixed(2).replace('.', ','),
        totalPaylable: (fee * months).toFixed(2).replace('.', ','),
      });
    }
  };

  const reset = () => {
    setErrorMessage();
    setTotal(null);
  };

  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.head}>
        <View style={styles.background} />
        <Text style={styles.titleApp}>Cotizador de prestamos</Text>
        <Form
          setCapital={setCapital}
          setInterest={setInterest}
          setMonths={setMonths}
        />
      </SafeAreaView>
      <ResultCalculation
        capital={capital}
        interest={interest}
        months={months}
        total={total}
        errorMessage={errorMessage}
      />
      <Footer calculate={calculate} />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  head: {
    height: 290,
    alignItems: 'center',
  },
  titleApp: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
  },
  background: {
    backgroundColor: colors.PRIMARY_COLOR,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height: 200,
    width: '100%',
    position: 'absolute',
    zIndex: -1,
  },
});

export default App;
