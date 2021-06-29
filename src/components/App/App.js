// Внешние модули
import { useState, useEffect } from 'react';
import { validate as validateBtc } from 'bitcoin-address-validation'; // Проверка введенного Биткоин адреса
import Particles from 'react-particles-js'; // Плавающие точки на фоне

// Внутренние модули
import Buttonvaluts from '../Buttonvaluts'; // Кнопка с выбором валюты
import Сart from '../form';
import TopHeader from '../TopHeader';
import MainContainer from '../MainContainer';
import SmallContainer from '../SmallContainer';
import ColumnCont from '../ColumnCont';
import InputNumber from '../InputNumber';
import InputText from '../InputText';

// Картинки с Валютами
import imgUSD from '../../img/money/USD.png'
import imgEUR from '../../img/money/EUR.png'
import imgRUB from '../../img/money/RUB.png'

import '../../style/App.css';


function App() {
  const labelsList = [{ name: '01', text: 'The first transaction should not exceed $500' },
                      { name: '02', text: 'You must pass verification on your first purchase, including Selfie, picture of document and proof of address' },
                      { name: '03', text: 'Make sure your bank card support 3D-secure.' }]
  const [moneyValue, setMoneyValue] = useState(100)
  const [moneyError, setMoneyError] = useState(false)

  const [email, setEmail] = useState('email@email.com')
  const [emailError, setEmailError] = useState(false)

  const [address, setAddress] = useState('')
  const [addressError, setaddressError] = useState(false)
  
  // переменная передающая название валюты которой покупают криптовалюту
  const [сurrency, setCurrency] = useState({ name: 'USD', imgUrl: imgUSD});
  const [cryptoCurrency, setCryptoCurrency] = useState('');
  const [cryptoValue, setCryptoValue] = useState(0);
  const [cryptoData, setcryptoData] = useState([]);

  const validateMoney = (value) => {
    let status = false
    if (typeof value === 'number' && value >= 0) {
      status = true
    }
    setMoneyError(!status)
    return status
  }
  const validateAndSetMoney = (value) => {
    validateMoney(value)
    setMoneyValue(value)
  }
  const validateEmail = (value) => {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    setEmailError(!re.test(value)) 
  }
  const validateAndSetEmail = (value) => {
    validateEmail(value)
    setEmail(value)
  }
  const validateAddress = (value) => {
    console.log(validateBtc(value))
    setaddressError(!validateBtc(value))
  }
  const validateAndSetAddress = (value) => {
    validateAddress(value)
    setAddress(value)
  }

  const submit = () => {
    const data = {
      amount_in: moneyValue,
      email,
      address
    }
    fetch('https://api.bitcoins.mn/indacoin/createBuyTransaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  }
  // Получение информации о Криптовалюте и ее стоимости( по умолчанию к доллару)
  const gettingPrice = async () => {
    const api_url = await fetch(`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=${сurrency.name}` )
    return api_url.json()
 
  }
  // Данные с валютой меняемой на Криптовалюту
  const сurrencyData = [
    { name: 'USD', imgUrl: imgUSD},
    { name: 'EUR', imgUrl: imgEUR },
    { name: 'RUB', imgUrl: imgRUB },
    { name: 'USD', imgUrl: imgUSD},
    { name: 'EUR', imgUrl: imgEUR },
    { name: 'RUB', imgUrl: imgRUB },
    { name: 'USD', imgUrl: imgUSD},
    { name: 'EUR', imgUrl: imgEUR },
    { name: 'RUB', imgUrl: imgRUB },
    { name: 'USD', imgUrl: imgUSD},
    { name: 'EUR', imgUrl: imgEUR },
    { name: 'RUB', imgUrl: imgRUB },
    { name: 'RUB', imgUrl: imgRUB }
  ]

  // данные из промиса которые содержат информацию по криптовалютам по отношению к валюте в переменной сurrency
  useEffect(() => {
      gettingPrice().then(data => {
        if (data.Data && data.Data.length) {
          const dataMap = data.Data.map(item => {
            return {
              name: item.CoinInfo.Name,
              imgUrl: "https://www.cryptocompare.com" + item.CoinInfo.ImageUrl,
              value: item.DISPLAY[сurrency.name].PRICE
            }
          })
          const [firstCrypto] = dataMap
          setCryptoCurrency(firstCrypto)
          setcryptoData(dataMap)
        }
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  
  useEffect(() => {
    const calculated = calculateCurrency(сurrency)
    setCryptoValue(calculated)
  }, [сurrency, moneyValue, cryptoCurrency])

  const calculateCurrency = (currency) => {
    // здесь математичский рассчет/ преобразование валюты
    const result = moneyValue
    return result
  }

  console.log(cryptoData)

  return (
    <div className = "App App-fonts">
      <Particles />
      <TopHeader />
      <MainContainer>
        <SmallContainer  className = "maximumCount">
        <div className = "wrapper_cards_column">
          { labelsList.map(data => (
              <Сart card={data} key={data.name}/>
            ))}
        </div>
          
        </SmallContainer>
        <SmallContainer className = "small_main">
          <div className="small_main-wrapperRow">
          <ColumnCont className = "columnLeft">
          <h4 className = "direction__Text">To</h4>
          <div className = "labelInput">            
            <p>You get</p>
            <InputNumber type="number" onChangeHandler={validateAndSetMoney} value={moneyValue} hasError={moneyError}>
              <Buttonvaluts list={сurrencyData} сurrency={сurrency} onClickHandler={setCurrency} />
            </InputNumber>
          </div>            
            <InputText onChangeHandler={validateAndSetEmail} value={email} hasError={emailError} placeholder = 'Your real email address' type = "email"></InputText>
          </ColumnCont>
          <ColumnCont className = "column-cont">
          <h4 className = "direction__Text">From</h4>
          <div className = "labelInput">
            <p>You get</p>
            <InputNumber disabled = "disabled" type = "text" value={cryptoValue}>
              <Buttonvaluts list={cryptoData} сurrency={cryptoCurrency} onClickHandler={setCryptoCurrency}/>
            </InputNumber>
          </div>            
            <InputText onChangeHandler={validateAndSetAddress} value={address} hasError={addressError} placeholder = 'Your BTC Address' type = "text"></InputText>
          </ColumnCont>
          </div>
          <div className = "buttonSubmit">
            <button type="button" onClick={submit}>BUY {cryptoCurrency.name}</button>
          </div>
          
        </SmallContainer>
        
      </MainContainer>
      
    </div>
  )
}

export default App;