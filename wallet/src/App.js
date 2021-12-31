import './App.css';
import { ethers} from "ethers"
import { Container, Box, CssBaseline, Button, Card} from '@material-ui/core';
import {Stack, TextField} from "@mui/material"
import React from "react"

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

  const [existWallet, setExistWallet] = React.useState(false)
  const [createWallet, setCreateWallet] = React.useState(false)
  const [address, setAddress] = React.useState('')
  const [show, setShow] = React.useState(false)
  const [balance, setBalance] = React.useState(null)
  const [loading,setLoading] = React.useState(false)
  const [memonic, setMemonic] = React.useState('')
  const [key, setKey] = React.useState('')

  const createNewWallet = () => {
    setExistWallet(false)
    setCreateWallet(true)
    creating()
  }

  const creating = async () => {
    setLoading(true)
    const ok = ethers.Wallet.createRandom();
    const provider = ethers.getDefaultProvider()
    const conn = ok.connect(provider)
    const bal = await conn.getBalance()
    const final_bal = ethers.utils.formatUnits(bal)
    setBalance(final_bal)
    setAddress(ok.address)
    setShow(true)
    setLoading(false)
  }

  const loadExistWallet = () => {
    setCreateWallet(false)
    setExistWallet(true)
  }
  const loadWalletData = async () => {
    if(memonic != ''){
      setLoading(true)
      let wal = ethers.Wallet.fromMnemonic(memonic)
      const provider = ethers.getDefaultProvider()
      const conn = wal.connect(provider)
      const bal = await conn.getBalance()
      const final_bal = ethers.utils.formatUnits(bal)
      setBalance(final_bal)
      setAddress(wal.address)
      setShow(true)
      setLoading(false)
    }else if (key != ''){
      setLoading(true)
      let wal = new ethers.Wallet(key)
      const provider = ethers.getDefaultProvider()
      const conn = wal.connect(provider)
      const bal = await conn.getBalance()
      const final_bal = ethers.utils.formatUnits(bal)
      setBalance(final_bal)
      setAddress(wal.address)
      setShow(true)
      setLoading(false)
    }else{
      window.alert('Invalid Input !')
    }
  }
  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#cfe8fc', height: '70vh' }}>
        <Stack spacing={17} direction="row">
        <Button variant="contained" 
        style = {{background: '#0063cc', color: 'white'}} onClick = {createNewWallet}>Create New Wallet</Button>
        <Button variant="contained" 
        style = {{background: '#0063cc', color: 'white'}} onClick = {loadExistWallet}>Import Existing Wallet</Button>
        </Stack>
        {createWallet && <Box sx={{ bgcolor: 'white', height: '30vh' }}>
          {loading && <h1>{'loading....'}</h1>}
          {show && <div>
            <h1>Your Wallet Address & Balance is :</h1>
          <p>{address}</p>
          <p>{balance}</p></div>}
          </Box>}
          {existWallet && <Box sx={{ bgcolor: 'white', height: '50vh', paddingTop: '20px', marginTop: '20px' }}>
          <Stack spacing={10} direction="row">
          <TextField id="outlined-basic" label="Memonic" variant="outlined"
          onChange = {(e) => setMemonic(e.target.value)} />
            <h1>OR</h1>
            <TextField id="outlined-basic" label="Private Key" variant="outlined"
            onChange = {(e) => setKey(e.target.value)} />
          </Stack>
          <Button variant="contained" 
        style = {{background: '#0063cc', color: 'white'}} onClick = {loadWalletData}>SUBMIT</Button>
         {loading && <h1>{'loading....'}</h1>}
        {show && <div>
          <h1>Your Wallet Address & Balance is :</h1>
          <p>{address}</p>
          <p>{balance}</p>
          </div>}
          </Box>}
        </Box>
      </Container>
    </div>
  );
}

export default App;
