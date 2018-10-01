import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {computed, observable} from "mobx";
import * as mobx from "mobx";
import {observer} from "mobx-react";
import Big from 'big.js'; // to address JavaScript floating point precision -- https://github.com/MikeMcl/big.js/ and http://mikemcl.github.io/big.js/

/*
 * Simple calculator using React and MobX.
 * Tested using Cypress.
 */

// TODO add exponent operator
// TODO add square root operator
// TODO add n-root operator
// TODO display numbers in scientific notation after a certain limit
// TODO deal with display of large numbers (currently increases the size of the display)
// TODO negative inputs

const math = {
    addition: (...numbers) => {
        let sum = new Big(0);
        numbers.forEach((element) => {
            sum = sum.plus(parseFloat(element));
        });
        console.log("sum " + sum.valueOf());
        return sum.valueOf();
    },
    subtraction: (...numbers) => {
        let diff = new Big(parseFloat(numbers[0]));
        for(let i = 1; i < numbers.length; i++) {
            diff = diff.minus(Big(parseFloat(numbers[i])));
        }
        return diff;
    },
    multiplication: (...numbers) => {
        let total = new Big(parseFloat(numbers[0]));
        for (let i = 1; i < numbers.length; i++) {
            total = total.times(Big(parseFloat(numbers[i])));
        }
        return total;
    },
    division: (...numbers) => {
        let total = new Big(parseFloat(numbers[0]));
        for (let i = 1; i < numbers.length; i++) {
            total = total.div(Big(parseFloat(numbers[i])));
        }
        return total;
    },
    NUMERIC_INPUT: {
        ZERO: 0,
        ONE: 1,
        TWO: 2,
        THREE: 3,
        FOUR: 4,
        FIVE: 5,
        SIX: 6,
        SEVEN: 7,
        EIGHT: 8,
        NINE: 9,
        DECIMAL: '.'
    },
    OPERATOR_INPUT: {
        ADD: '+',
        SUBTRACT: '-',
        MULTIPLY: 'x',
        DIVIDE: '\u00F7',
        EQUALS: '=',
        CLEAR: 'c',
        ALL_CLEAR: 'ac'
    },
    MIN_NUMBERS : 2,
    MIN_OPERATORS : 1,
    compute: (numArray, opArray) => {
        let calcValue = new Big(0);
        if(numArray.length < math.MIN_NUMBERS || opArray < math.MIN_OPERATORS) {
            return;
        }

        opArray.forEach((operator) => {
           switch(operator) {
               case math.OPERATOR_INPUT.ADD:
                   console.log("t" + math.addition(numberArray[0], numberArray[1]));
                   calcValue = calcValue.plus(math.addition(numberArray[0], numberArray[1]));
                   numberArray.shift();
                   numberArray.shift();
                   numberArray.push(calcValue.valueOf());
                   break;

               case math.OPERATOR_INPUT.SUBTRACT:
                   calcValue = calcValue.plus(math.subtraction(numberArray[0], numberArray[1]));
                   numberArray.shift();
                   numberArray.shift();
                   numberArray.push(calcValue.valueOf());
                   break;

               case math.OPERATOR_INPUT.MULTIPLY:
                   calcValue = calcValue.plus(math.multiplication(numberArray[0], numberArray[1]));
                   numberArray.shift();
                   numberArray.shift();
                   numberArray.push(calcValue.valueOf());
                   break;

               case math.OPERATOR_INPUT.DIVIDE:
                   calcValue = calcValue.plus(math.division(numberArray[0], numberArray[1]));
                   numberArray.shift();
                   numberArray.shift();
                   numberArray.push(calcValue.valueOf());
                   break;

               default:
           }
           operatorArray.shift();
        });

        // clear the num and operator caches
        //numberArray = [];
        //operatorArray = [];
        calculatorStore.currentDisplay = calcValue.valueOf();
        console.log("Calculated: " + calcValue);
    },
    allClear : () => {
        // clear the num and operator caches
        numberArray = [];
        operatorArray = [];
        calculatorStore.currentDisplay = 0;
        console.log('all clear');
    }
};

let numberArray = [];
let operatorArray = [];
let lastInputType = math.OPERATOR_INPUT;
let lastInputValue = 0;

function App(props) {
  return(
    <div
        className="app"
        id="app"
    >
      <Calculator />
    </div>
  );
}

class CalculatorStore {
    @observable currentDisplay = 0;

    constructor() {
        mobx.autorun(() =>
            console.log(this.calculate)
        );
    }

    @computed get calculate() {
        let calcValue = 0;
        return calcValue;
    }

} // end class CalculatorStore

class Calculator extends React.Component {

    renderButton(value, type, addClass) {
        return(
          <Button
              value={value}
              type={type}
              addClass={addClass}
          />
        );
    }

    render() {
        return (
            <div
                className="calculator"
                id="calculator"
            >
                <Display />
                <div className="buttonContainer">
                    {this.renderButton(math.NUMERIC_INPUT.ONE, math.NUMERIC_INPUT, 'one')}
                    {this.renderButton(math.NUMERIC_INPUT.TWO, math.NUMERIC_INPUT, 'two')}
                    {this.renderButton(math.NUMERIC_INPUT.THREE, math.NUMERIC_INPUT, 'three')}
                    {this.renderButton(math.NUMERIC_INPUT.FOUR, math.NUMERIC_INPUT, 'four')}
                    {this.renderButton(math.NUMERIC_INPUT.FIVE, math.NUMERIC_INPUT, 'five')}
                    {this.renderButton(math.NUMERIC_INPUT.SIX, math.NUMERIC_INPUT, 'six')}
                    {this.renderButton(math.NUMERIC_INPUT.SEVEN, math.NUMERIC_INPUT, 'seven')}
                    {this.renderButton(math.NUMERIC_INPUT.EIGHT, math.NUMERIC_INPUT, 'eight')}
                    {this.renderButton(math.NUMERIC_INPUT.NINE, math.NUMERIC_INPUT, 'nine')}
                    {this.renderButton(math.NUMERIC_INPUT.ZERO, math.NUMERIC_INPUT, 'zero')}
                    {this.renderButton(math.NUMERIC_INPUT.DECIMAL, math.NUMERIC_INPUT, 'decimal')}
                    {this.renderButton(math.OPERATOR_INPUT.CLEAR, math.OPERATOR_INPUT, 'clear')}
                    {this.renderButton(math.OPERATOR_INPUT.DIVIDE, math.OPERATOR_INPUT, 'divide')}
                    {this.renderButton(math.OPERATOR_INPUT.MULTIPLY, math.OPERATOR_INPUT, 'multiply')}
                    {this.renderButton(math.OPERATOR_INPUT.SUBTRACT, math.OPERATOR_INPUT, 'subtract')}
                    {this.renderButton(math.OPERATOR_INPUT.ADD, math.OPERATOR_INPUT, 'add')}
                    {this.renderButton(math.OPERATOR_INPUT.EQUALS, math.OPERATOR_INPUT, 'equals')}
                    {this.renderButton(math.OPERATOR_INPUT.ALL_CLEAR, math.OPERATOR_INPUT, 'allClear')}
                </div>
            </div>
        );
    }
} // end class Calculator

@observer
class Display extends React.Component {

    render() {
        return(
          <div
              className="display"
              id="display"
          >
              {calculatorStore.currentDisplay}
          </div>
        );
    }
} // end class Display

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonValue : this.props.value,
            buttonType : this.props.type,
            buttonClass : this.props.addClass
        }
    }

    // this function stores operator and number input and invokes computation as required
    storeSelf = () => {
        // TODO handle overflow?
        let selfValue = this.state.buttonValue;
        let selfType = this.state.buttonType;

        // TODO separate clear functionality from all clear
        if(selfValue === math.OPERATOR_INPUT.ALL_CLEAR || selfValue === math.OPERATOR_INPUT.CLEAR) {
            math.allClear();
            lastInputValue = selfValue;
            lastInputType = selfType;
            return;
        // Disallows two operators in a row
        } else if (selfType === math.OPERATOR_INPUT && lastInputType === math.OPERATOR_INPUT && lastInputValue !== math.OPERATOR_INPUT.EQUALS) {
            console.log("invalid input -- disallow two operators in a row")
            return;
        }

        // logic regarding operators
        if(selfType === math.OPERATOR_INPUT) {
            if(selfValue === math.OPERATOR_INPUT.EQUALS) {
                math.compute(numberArray, operatorArray);
            } else if(operatorArray.length > 0) {
                math.compute(numberArray, operatorArray);
                operatorArray.push(selfValue);
                console.log("Operator Array: ");
                operatorArray.forEach((element) => {
                    console.log(element);
                });
                console.log("--------------");
            } else {
                operatorArray.push(selfValue);
                console.log("Operator Array: ");
                operatorArray.forEach((element) => {
                    console.log(element);
                });
                console.log("--------------");
            }
            lastInputType = selfType;
            lastInputValue = selfValue;
        } else if(selfType === math.NUMERIC_INPUT) { // logic regarding numbers
            // if the previous input is a numeric input then concatenate
            if(lastInputType === math.NUMERIC_INPUT) {
                let indexes = (source, find) => { // searches a source for instances of a string and returns all of the indexes in an array
                    let result = [];
                    for(let i = 0; i < source.length; i++) {
                        if(source.substring(i, i + find.length) === find) {
                            result.push(i);
                        }
                    }
                    return result;
                };
                let bCurrentNumHasDecimal = indexes(numberArray[operatorArray.length], math.NUMERIC_INPUT.DECIMAL).length >= 1;
                if(bCurrentNumHasDecimal && selfValue === math.NUMERIC_INPUT.DECIMAL) {
                    console.log("no more than one decimal in a number");
                } else {
                    numberArray[operatorArray.length] = (numberArray[operatorArray.length] ? numberArray[operatorArray.length] : '') + '' + selfValue;
                    calculatorStore.currentDisplay = numberArray[operatorArray.length];
                }
                //if()

            } else { // if the previous input was an operator, store in a new array
                if(selfValue === math.NUMERIC_INPUT.DECIMAL) { // if starting with a decimal, prepend a 0
                    selfValue = 0 + math.NUMERIC_INPUT.DECIMAL;
                }
                numberArray.push(selfValue);
                calculatorStore.currentDisplay = selfValue;
            }
            console.log("Number Object: ");
            numberArray.forEach((element) => {
                console.log(element);
            });
            console.log("--------------");
            lastInputType = selfType;
            lastInputValue = selfValue;
        } else {
            console.log("oops...");
            console.log('self: ' + selfValue);
        }
    }

    render() {
        return(
          <div
              className={'button ' + this.state.buttonClass}
              id={'btn_' + this.state.buttonClass}
              onClick={this.storeSelf}
          >
              {this.state.buttonValue}
          </div>
        );
    }
} // end class Button

const calculatorStore = new CalculatorStore();

ReactDOM.render(<App store={calculatorStore} />, document.getElementById('root'));
registerServiceWorker();
