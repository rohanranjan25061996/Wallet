import React from "react"
import { ethers } from "ethers"
import { Container, Box, CssBaseline, Button, Card} from '@material-ui/core';
import {Stack, TextField} from "@mui/material"
import {FaWallet, FaBalanceScaleLeft} from "react-icons/fa"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const ImportWallet = (props) => {

  const [existWallet, setExistWallet] = React.useState(false)
  const [address, setAddress] = React.useState('')
  const [show, setShow] = React.useState(false)
  const [balance, setBalance] = React.useState(null)
  const [loading,setLoading] = React.useState(false)
  const [memonic, setMemonic] = React.useState('')
  const [key, setKey] = React.useState('')
  const [newtwork, setNetWork] = React.useState('')

  const handelNetwork = (event) => {
      setNetWork(event.target.value)
  }

  const loadExistWallet = () => {
      if(newtwork != ''){
        setExistWallet(true)
      }else{
          window.alert('Please choose from which n/w you want to connect your wallet')
      }
  }
  const loadWalletData = async () => {
    if(memonic != ''){
      setLoading(true)
      let wal = ethers.Wallet.fromMnemonic(memonic)
    let provider
    if(newtwork == 'ethereum'){
        provider = ethers.getDefaultProvider()
    }else{
        provider = new ethers.providers.EtherscanProvider(newtwork)
    }
      const conn = wal.connect(provider)
      const bal = await conn.getBalance()
      const final_bal = ethers.utils.formatUnits(bal)
      let data = {
        address: wal.address,
        privateKey: wal.privateKey,
        publicKey: wal.publicKey
    }
    localStorage.setItem('old_wallet', JSON.stringify(data))
      setBalance(final_bal)
      setAddress(wal.address)
      setShow(true)
      setLoading(false)
    }else if (key != ''){
      setLoading(true)
      let wal = new ethers.Wallet(key)
      let provider
    if(newtwork == 'ethereum'){
        provider = ethers.getDefaultProvider()
    }else{
        provider = new ethers.providers.EtherscanProvider(newtwork)
    }
      const conn = wal.connect(provider)
      let data = {
        address: wal.address,
        privateKey: wal.privateKey,
        publicKey: wal.publicKey
    }
    localStorage.setItem('old_wallet', JSON.stringify(data))
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
    return(
        <>
        <div className="App">
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#cfe8fc', height: '70vh', width: '120%' }} style = {{textAlign: 'center'}}>
        {!existWallet && <Button variant="contained" 
        style = {{background: '#0063cc', color: 'white', marginTop: "20px"}} onClick = {loadExistWallet}>Import Existing Wallet</Button>}
        {!existWallet && <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-standard-label">Choose Network</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={newtwork}
          onChange={handelNetwork}
          label="Choose N/W"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'ethereum'}>Ethereum Mainnet</MenuItem>
          <MenuItem value={'ropsten'}>Ropsten Test Network</MenuItem>
          <MenuItem value={'kovan'}>Kovan Test Network</MenuItem>
          <MenuItem value={'rinkeby'}>Rinkeby Test Network</MenuItem>
          <MenuItem value={'goerli'}>Goerli Test Network</MenuItem>
        </Select>
      </FormControl>}
          {existWallet && <Box sx={{ bgcolor: '#ef8119', height: '15vh', paddingTop: '20px', marginTop: '20px',
        color: 'white', borderRadius: '10px' }}>
          <Stack spacing={10} direction="row">
          <TextField id="outlined-basic" label="Memonic" variant="outlined"
          style = {{color: 'white', fontSize: '15px', marginLeft: '25px'}}
          onChange = {(e) => setMemonic(e.target.value)} />
            <h1>OR</h1>
            <TextField id="outlined-basic" label="Private Key" variant="outlined"
            onChange = {(e) => setKey(e.target.value)} style = {{color: 'white', fontSize: '15px'}} />
          </Stack>
          <div style = {{paddingTop: '20px'}}>
          <Button variant="contained" 
        style = {{background: '#0063cc', color: 'white'}} onClick = {loadWalletData}>SUBMIT</Button>
          </div>
         {loading && <h1>{'loading....'}</h1>}
         <Box>
         {show && <Box sx={{ bgcolor: '#021627', height: '20vh', width: '100%', color: '#7b8a98', fontSize: '20px', 
         borderRadius: '10px', marginTop: '50px' }}>
            <div style = {{paddingTop: '20px'}}>
          <p><FaWallet /> : <span>{address}</span> </p>
          <p><FaBalanceScaleLeft /> :  <span>{balance}</span> </p>
          <p>This address is also saved in local storage you can start transction</p>
          </div>
             </Box>}
         </Box>
          </Box>}
        </Box>
      </Container>
    </div>
        </>
    )
}

export default ImportWallet