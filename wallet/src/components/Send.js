import React from "react"
import { ethers } from "ethers"
import { Container, Box, CssBaseline, Button, Card} from '@material-ui/core';
import {FaWallet} from "react-icons/fa"

const Send = (props) => {


    const [start, setStart] = React.useState(false)

    const startTransaction = () => {
        setStart(true)
    }
    const getBothAddress = () => {
        let old_address = '';
        let new_address = '';
        if(localStorage.getItem('old_wallet') != null){
            let temp = localStorage.getItem('old_wallet')
            temp = JSON.parse(temp)
            const {address} = temp
            old_address = address
        }

        if(localStorage.getItem('new_wallet') != null){
            let temp = localStorage.getItem('new_wallet')
            temp = JSON.parse(temp)
            const {address} = temp
            new_address = address
        }

        if(old_address != '' && new_address != ''){
            return(
                <>
                <p>Old <FaWallet />  public address: {old_address} </p>
                <p>New <FaWallet />  public address: {new_address} </p>
                <Button variant="contained" 
        style = {{background: '#24a082', color: 'black'}} onClick = {startTransaction}>START</Button>
                </>
            )
        }else{
            return(
                <>
                <p style = {{color: 'red'}}>Please create new wallet and also import extisting wallet. Only after that we can proceed with transaction</p>
                </>
            )
        }
    }

    return(
        <>
        <CssBaseline />
        <Container  maxWidth="sm">
        <Box sx={{ bgcolor: '#cfe8fc', height: '70vh', width: '120%' }} style = {{textAlign: 'center'}}>
            <Box sx = {{bgcolor: '#2436a0', height: '16vh', width: '100%', marginTop: '30px', textAlign: 'center', 
            color: 'white', fontSize: '18px', paddingTop: '5px', borderRadius: '5px'}}>
            {getBothAddress()}
            </Box>
        </Box>
        </Container>
        </>
    )
}

export default Send