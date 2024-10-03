import { Children, createContext, useEffect, useRef, useState } from "react";

export const mycontext = createContext()


export default function Contextprovider(props) {
    const inputref = useRef(null)
    const [inputval, setInputval] = useState('bitcoin')
    const [loader, setLoader] = useState(false)
    const [name, setName] = useState('Bitcoin')
    const [symbol, setSymbol] = useState('BTC')
    const [marketcap, setMarketcap] = useState(6854435682.98)
    const [price, setPrice] = useState(64000.98)
    const [trend, setTrend] = useState(2.4)
    const [errormsg, setErrormsg] = useState('null')


    useEffect(() => {
        setTimeout(() => {
            getData()
        }, 200)
        
    }, [inputval])



     function getData() {
        setLoader(true)
         console.log('request sent')
        fetch(`https://api.coincap.io/v2/assets/${inputval}`).then(response => {
        return response.json()
        }).then(info => {

            if (info.error) {
                setErrormsg(info.error)
                setLoader(false)
            }
            
            else {
             setName(info.data.name)
        
        setSymbol(info.data.symbol)
        setMarketcap(info.data.marketCapUsd)
        setPrice(info.data.priceUsd)
        setTrend(info.data.changePercent24Hr)
        setErrormsg('null')
        setLoader(false)   
        }
        
        }).catch((error) => {
            setErrormsg(error.message)
            setLoader(false)
    })

   }



    return <>
    <mycontext.Provider value={{inputref, name, inputval, setInputval, getData, loader, errormsg, symbol, marketcap, price, trend}}>
       {props.children}
    </mycontext.Provider>
        

    
    </>


}