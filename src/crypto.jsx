import { useEffect, useRef, useState } from "react"
import Loader from "./loader"
import { useContext } from "react"
import { mycontext } from "./context"

export default function Crypto(props) {
  const {getData, loader, errormsg, symbol, marketcap, price, trend, name} = useContext(mycontext) 
    
    
   

    


   

    useEffect(() => {
        getData()
        
}, [])
   




    return <>
        <div className="crypto-container">
            
            
            {loader ? <Loader /> : null}
            {errormsg !== 'null' && loader !== true ? <h1>{errormsg}</h1> : null}
            {errormsg == 'null' && loader !== true ? <><div className="crypto-name">
                <h3>{symbol}</h3>
                <h1>{name}</h1>
            </div>
            <div className="crypto-market">
                <h2>Market Cap:</h2>
                <h3>$ {Number(marketcap).toFixed(2)} </h3>
            </div>
            <div className="crypto-price">
                <h2>Price:</h2>
                <h3>$ {Number(price).toFixed(2)}</h3>
            </div>
            <div className="crypto-trend">
                <h2>Trend:</h2>
                <h3 className={trend < 0 ? "red": null}>{Number(trend).toFixed(2)}%</h3>
            </div></> : null}
            
            
     </div>
    
    </>
}