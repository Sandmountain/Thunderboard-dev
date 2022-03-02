import { setCORS } from 'google-translate-api-browser';
import axios from 'axios';

import { languages } from './languages.js';
import { availableCurrencies } from './currency.js';
import { conversionFormulas } from './conversions.js';

const Parser = require('expr-eval').Parser;
const parser = new Parser();

const translate = setCORS('http://cors-anywhere.herokuapp.com/');

export const defineText = async (text, defaultCurrency, language) => {
  try {
    const splitInput = text.trim().match(/[\d.]+|\D+/g);
    const units = splitInput[1].match(/\b[^\s]+\b/g);

    if (units !== null) {
      const exchangeCurrencies = { base: validateCurrency(units[0]) };
      // Exchange
      if (exchangeCurrencies.base.valid) {
        exchangeCurrencies['target'] = validateCurrency(units[2]);
        if (exchangeCurrencies.target.valid) {
          return {
            value: `${splitInput[0]} ${
              exchangeCurrencies.base.currency[0]
            } is ${await retriveExchange(
              exchangeCurrencies.base.currency,
              exchangeCurrencies.target.currency,
              splitInput[0]
            )} ${exchangeCurrencies.target.currency[0]}`,
            label: `Currency Exchange`,
            type: 'exchange',
          };
        } else {
          exchangeCurrencies['target'] = validateCurrency(defaultCurrency);
          return {
            value: `${splitInput[0]} ${
              exchangeCurrencies.base.currency[0]
            } is ${await retriveExchange(
              exchangeCurrencies.base.currency,
              exchangeCurrencies.target.currency,
              splitInput[0]
            )} ${defaultCurrency}`,
            label: `Currency Exchange`,
            type: 'exchange',
          };
        }
      }

      // Other units
      const conversionTable = conversionFormulas[units[0]];

      if (conversionTable && conversionTable.value !== 'farenheit') {
        const converted =
          Math.round(splitInput[0] * conversionTable.value * 100) / 100;

        return {
          value: `${splitInput[0]} ${units[0]} is ${converted} ${conversionTable.si} `,
          label: `Converted ${units[0]} to SI`,
          type: 'conversion',
        };
      } else {
        const converted = Math.round(((splitInput[0] - 32) / 1.8) * 100) / 100;
        return {
          value: `${splitInput[0]} ${units[0]} is ${converted} ${conversionTable.si} `,
          label: `Converted ${units[0]} to SI`,
          type: 'conversion',
        };
      }
    } else {
      throw text;
    }
  } catch (error) {
    // Calculator
    if (mathEval(text)) {
      const math = parser.evaluate(text);
      return {
        value: `${text} = ${math}`,
        label: `Equation`,
        type: 'hello',
      };
    }
    // Translate
    if (text.substring(0, 9) === 'translate') {
      try {
        let res = await Promise.resolve(
          translateText(text.substring(10, text.length), language)
        );
        return {
          value: res.text,
          label: `Translated text from ${
            languages[res.from.language.iso]
          } to ${language} `,
          type: 'translate',
        };
      } catch (error) {
        return {
          value: 'There was a problem with the server',
          label: `Server Error `,
          type: 'error',
        };
      }
    }

    return {
      value: `Your input couldn't be parsed`,
      label: `Error`,
      type: 'error',
    };
  }
};

const validateCurrency = (curr) => {
  const isValid = Object.entries(availableCurrencies).find((currency, idx) =>
    currency[1].synonyms.includes(curr)
  );
  return isValid
    ? { currency: isValid, valid: true }
    : { currency: '', valid: false };
};

const retriveExchange = async (base, target, amount) => {
  const res = await axios.get(
    'http://data.fixer.io/api/latest?access_key=05f483d0f8787349d38ae227b45242d4&symbols=USD,SEK,EUR,GBP,JPY&format=1'
  );

  if (res.status === 200) {
    return (
      Math.round(
        ((res.data.rates[target[0]] * amount) / res.data.rates[base[0]]) * 100
      ) / 100
    );
  } else {
    return res.statusText;
  }
};

const translateText = async (text, language) => {
  return translate(text, { to: language })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
};

const mathEval = (exp) => {
  var reg = /(?:[a-z$_][a-z0-9$_]*)|(?:[;={}[\]"'!&<>^\\?:])/gi,
    valid = true;

  // Detect valid JS identifier names and replace them
  exp = exp.replace(reg, function ($0) {
    // If the name is a direct member of Math, allow
    if (Math.hasOwnProperty($0)) {
      return 'Math.' + $0;
    } else if (Math.hasOwnProperty($0.toUpperCase())) {
      return 'Math.' + $0.toUpperCase();
    }
    // Otherwise the expression is invalid
    else valid = false;
  });

  // Don't eval if our replace function flagged as invalid
  if (!valid) return false;
  else return true;
};
