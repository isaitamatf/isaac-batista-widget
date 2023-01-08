import React, { useState, useEffect } from 'react';
import { Toolbar, History } from './components';
import { getCryptos, getCurrencies, getRates, getHistory, postHistory } from './middleware';
import './App.scss';

async function getCryptosPromise() {
  const response = getCryptos();
  return await response;
};

async function getCurrenciesPromise() {
  return await getCurrencies();
};

async function getRatesPromise() {
  return await getRates();
};

async function getHistoryPromise() {
  return await getHistory();
};

const PopUp = ({exchangeSubmitted, setExchangeSubmitted}) => {
  return (
    <div
      className={`popup ${exchangeSubmitted ? 'open' : ''}`}
      onClick={() => setExchangeSubmitted(false)}
    >
      <span className='heading-2'>Exchange submitted.</span>
    </div>
  );
};

function App() {
  const [ cryptos, setCryptos ] = useState();
  useEffect(() => {
    if (!cryptos) {
      getCryptosPromise().then((response) => {
        setCryptos(response);
      });
    }
  }, [cryptos]);
  
  const [ currencies, setCurrencies ] = useState();
  useEffect(() => {
    if (!currencies) {
      getCurrenciesPromise().then((response) => {
        setCurrencies(response);
      });
    }
  }, [currencies]);
  
  const [ rates, setRates ] = useState();
  useEffect(() => {
    if (!rates) {
      getRatesPromise().then((response) => {
        setRates(response);
      });
    }
  }, [rates]);

  const [history, setHistory] = useState();
  useEffect(() => {
    if (!history) {
      getHistoryPromise().then((response) => {
        setHistory(response);
      });
    }
  }, [history]);

  const [exchangeSubmitted, setExchangeSubmitted] = useState(false);
  useEffect(() => {
    if (exchangeSubmitted) {
      setTimeout(() => {
        setExchangeSubmitted(false);
      }, 10000)
    }
  }, [exchangeSubmitted]);

  const handleOnSave = (history) => {
    postHistory(history, setHistory, setExchangeSubmitted);
  }

  return (
    <div className="container">
      {cryptos && currencies ? (
        <Toolbar
          cryptos={cryptos}
          currencies={currencies}
          rates={rates}
          handleOnSave={handleOnSave}
        />
      ) : (
        <></>
      )}
      {history ? <History data={history} /> : <></>}
      <PopUp exchangeSubmitted={exchangeSubmitted} setExchangeSubmitted={setExchangeSubmitted}/>
    </div>
  );
}

export default App;
