import './App.css';
import React from "react"
import NavBar from './routes/Nav';
import {Route, Routes} from "react-router-dom"
import Home from "./components/Home"
import CreateWallet from "./components/CreateWallet"
import NewWallet from "./components/ImportWallet"
import StartTransaction from "./components/Send"

// ========= NOTICE =========
// formatter.ts:511 Request-Rate Exceeded  (this message will not be repeated)
// formatter.ts:512 
// formatter.ts:513 The default API keys for each service are provided as a highly-throttled,
// formatter.ts:514 community resource for low-traffic projects and early prototyping.
// formatter.ts:515 
// formatter.ts:516 While your application will continue to function, we highly recommended
// formatter.ts:517 signing up for your own API keys to improve performance, increase your
// formatter.ts:518 request rate/limit and enable other perks, such as metrics and advanced APIs.
// formatter.ts:519 
// formatter.ts:520 For more details: https://docs.ethers.io/api-keys/
// formatter.ts:521 ==========================

// bubble thunder stumble above jar defy snap panther pepper useless agree verify

// 31874babf984a6b0442378122379ed5d50f4f37f5e7f519a0a54d5adf3aefcf1

function App() {
  return (
    <>
     <NavBar />
     <Routes>
       <Route path = "/" element = {<Home />}></Route>
       <Route path = "/createWallet" element = {<CreateWallet />}></Route>
       <Route path = "/importWallet" element = {<NewWallet />}></Route>
       <Route path = '/trancsaction' element = {<StartTransaction />}></Route>
     </Routes>
    </>
  );
}

export default App;
