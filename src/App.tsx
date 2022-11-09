import React,{useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import Web3 from "web3";

function App() {

  useEffect(()=>{
    if(window.ethereum){
      // window.ethereum.request({
      //   method: 'eth_requestAccounts',
      // }).then((accounts: any) => console.log(accounts))

      const web = new Web3(window.ethereum);
      web.eth.requestAccounts().then(console.log)
    }
  },[]);


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
