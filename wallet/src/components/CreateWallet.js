import React from "react"
import { ethers } from "ethers"
import { Container, Box, CssBaseline, Button, Card} from '@material-ui/core';
import {FaWallet, FaBalanceScaleLeft} from "react-icons/fa" 

const CreateWallet = (props) => {

  const [createWallet, setCreateWallet] = React.useState(false)
  const [address, setAddress] = React.useState('')
  const [show, setShow] = React.useState(false)
  const [balance, setBalance] = React.useState(null)
  const [loading,setLoading] = React.useState(false)

  const createNewWallet = () => {
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
    let data = {
        address: ok.address,
        privateKey: ok.privateKey,
        publicKey: ok.publicKey
    }
    localStorage.setItem('new_wallet', JSON.stringify(data))
    setShow(true)
    setLoading(false)
  }
    return(
        <>
        <div className="App">
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#cfe8fc', height: '70vh' }} style = {{textAlign: 'center'}}>
        {!createWallet && <Button variant="contained" 
        style = {{background: '#0063cc', color: 'white', marginTop: "20px"}} onClick = {createNewWallet}>Create New Wallet</Button>}

        {createWallet && <Box sx={{ bgcolor: '#021627', height: '25vh', color: '#7b8a98', fontSize: '20px',
    paddingTop: '20px', borderRadius: '10px'}}>
          {loading && <h1>{'loading....'}</h1>}
          {show && <div>
          <p><FaWallet/> Address  <span>{address}</span></p>
          <p> <FaBalanceScaleLeft /> <span>{balance}</span></p>
          <p>This public address also saved in local storage you can start transaction with existing wallet.</p></div>}
          </Box>}
        </Box>
      </Container>
    </div>
        </>
    )
}

export default CreateWallet