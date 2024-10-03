import { useContext, useEffect, useRef, useState } from "react"
import { mycontext } from "./context"
    
    
    
export default function Input(props) {
    const { inputref, inputval, setInputval, getData } = useContext(mycontext)
    const boxref = useRef(null)
    const [coinlist, setCoinlist] = useState([])
    const [oldlist, setoldlist] = useState([])
    const [showerror, setShowerror] = useState(false)

    const coinlistRef = useRef(coinlist);

useEffect(() => {
    coinlistRef.current = coinlist;
}, [coinlist]);
    
    
    const oldlistref = useRef(oldlist);

useEffect(() => {
    oldlistref.current = oldlist;
}, [oldlist]);

    function startfetch(e) {
        if (e.key == 'Enter') {
            if (coinlistRef.current.length > 0 && coinlistRef.current[0].id.includes(inputref.current.value)) {
                    inputref.current.value = coinlistRef.current[0].id
                }
                
                setInputval(inputref.current.value)
               
                boxref.current.style.visibility = 'hidden'
            }
        
            
        
        else {

            setShowerror(false)
            
            boxref.current.style.visibility = 'visible'
            

                
              coinlistRef.current = oldlistref.current
                



                setTimeout(() => {
                
                   
               let newcoinlist = coinlistRef.current.filter((item, _index) => {
                    return (
                       item.id.includes(inputref.current.value)
                   ) 
                })
                
                
                    if (newcoinlist.length == 0) {
                    setShowerror(true)
                }
                setCoinlist(newcoinlist)

                }, 100);  
              
                
           }
           
    
        
       } 


    useEffect(() => {

        


        inputref.current.addEventListener('keydown', startfetch)

        return () => {
            inputref.current.removeEventListener('keydown', startfetch);
        };

        
    }, [])


    useEffect(() => {
        
        inputref.current.addEventListener('focus', () => {
        boxref.current.style.visibility = 'visible'
    })

        inputref.current.addEventListener('blur', () => {

            setTimeout(() => {
             boxref.current.style.visibility = 'hidden'
        }, 300)

        
        
        
        })
        

       

    }, [])


    useEffect(() => {
        fetch('https://api.coincap.io/v2/assets').then(response => {
return response.json()
        }).then(namelist => {
            
            setCoinlist(namelist.data)
            setoldlist(namelist.data)
           
          
           
            
            
      })
  }, [])



    





    function fillvalue(e) { 

        
        inputref.current.value = e.target.textContent
        setInputval(e.target.textContent)
      
       
       
      

  }




    return <>
        
        <input type="text" placeholder="enter crypto name" ref={inputref}  />
        <div className="suggestion-container">

            <div className="suggestion-box" ref={boxref}>
              
                
                {showerror ? <div className="not-found"><h1>No match Found</h1></div> : null }
               
                {coinlist.map((item, _index) => {
                    return (
                      <> <h3 onClick={fillvalue}>{item.id}</h3>
                      <hr></hr></>
                    )
                
            })}
            
            
            
            </div>  
        </div>
      
   
    
    </>
}