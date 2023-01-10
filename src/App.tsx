import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import { BrydgeWidget } from "@brydge-network/widget";
import { encodeUrl } from "@brydge-network/utils";
import { ethers } from "ethers";

const abi = require("./polygon-usdc-abi.json");
const price = 1;

function App() {
  const usdcInterface = new ethers.utils.Interface(abi);

  const encoded = usdcInterface.encodeFunctionData("transfer", [
    "0x637e10d84ca40B59250bb7758e45F2468fe7c4B7",
    price * Math.pow(10, 6),
  ]);
  const calls = [
    {
      _to: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", // polygon usdc
      _value: 0,
      _calldata: encoded,
    },
  ];

  const url =
    "https://brydge.network/widget/" +
    encodeUrl({
      darkMode: true,
      widgetMode: "PURCHASE",
      outputTokenAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", // polygon usdc
      destinationChainId: 137,
      title: "Subscribe",
      price: 0.1,
      iCalls: calls,
      backgroundColor: "#00000000",
    });

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <object
          title="Brydge.network purchase mode"
          data={url}
          width={360}
          height={500}
          type="text/html"
        />
      </header>
    </div>
  );
}

export default App;
