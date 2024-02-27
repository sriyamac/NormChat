import React from 'react'

export default function Header() {
    return (
        <div className='header'>
            <div className="logo_div">
                <img className="logo" src={require("../images/logo.png")} width="250px" height="250px"></img>
            </div>
            <div className='title_div'>
                <h1 className='header-title'>NormChat</h1>
            </div>
        </div >
    )
}
