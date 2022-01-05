import React from "react"
import {Link} from "react-router-dom"
import css from "./styles/index.module.css"
const NavBar = () => {

    return(
        <>
        <div className={css.nav}>
  <input type="checkbox" id="nav_check" />
  <div className={css.nav_header}>
    <div className={css.nav_title}>
      Crytocurrency
    </div>
  </div>
  <div className={css.nav_btn}>
    <label for="nav_check">
      <span></span>
      <span></span>
      <span></span>
    </label>
  </div>
  
  <div className={css.nav_links}>
      <Link to = "/" className = {css.Link}>Home</Link>
      <Link to = "/createWallet" className = {css.Link}>Create Wallet</Link>
      <Link to = "importWallet" className = {css.Link}>Import Wallet</Link>
      <Link to = "/trancsaction" className = {css.Link}>Start Transaction</Link>
  </div>
</div>
        </>
    )
}

export default NavBar