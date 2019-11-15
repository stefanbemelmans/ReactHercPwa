import React from "react";
import { Link } from "react-router-dom"

export const HeaderLinks = (props) => (
<div>
    <Link to="/wallet">Wallet</Link>
    <br />
    <Link to="/account">Account</Link>
    <br />
    <Link to="/login">Login</Link>
    <br />
    <Link to="/home">Home</Link>
    <br />
    <Link to="/">Root</Link>
</div>
)