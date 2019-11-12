import React from 'react'
import { WalletInfo } from "./WalletInfo" 
export const Wallet = (props) =>  <WalletInfo account={props.edgeAccount} wallet={props.edgeWallet} key="wallet" />
