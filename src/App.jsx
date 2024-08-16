import { useState } from "react";
import "./App.css";
import Input from "./components/input";
import useCurrencyInfo from "./hooks/UseCurrency";
import "./index.css";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertAmount, setConvertAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  
  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertAmount(amount);
    setAmount(convertAmount);
  };

  const convert = () => setConvertAmount(amount * currencyInfo[to]);

  const options = Object.keys(currencyInfo);

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-center bg-no-repeat">
      <div className="w-full">
        <div className="w-full max-w-xl mx-auto border border-gray-60 rounded-lg p-8 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <Input
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={setFrom}
                selectCurrency={from}
                onAmountChange={setAmount}
              />
            </div>

            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>

            <div className="w-full mt-1 mb-4">
              <Input
                label="To"
                amount={convertAmount}
                currencyOptions={options}
                onCurrencyChange={setTo}
                selectCurrency={to}
                amountDisable
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
