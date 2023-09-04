import { useState , useEffect , useRef , useCallback } from "react"

function App() {
  
  const [paasword , setPaasword] = useState()
  const [length , setLength] = useState(6)
  const [isNum , setIsNum] = useState(false)
  const [isChar , setIsChar] = useState(false)
  const paaswordRef = useRef(null)

  const paaswordGenerator = useCallback( () => {

      let numString = "0123456789" ;
      let alphaString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" ;
      let chString = "!@#$%&*?'-_" ;
      let ans = "" ;
  
      for(let i=0 ; i<length ; i++)
      {
        if(isChar)  alphaString += chString ;
        if(isNum)  alphaString += numString ;
  
        let ind = Math.floor(Math.random() * alphaString.length) ;
        ans += alphaString[ind] ;
      }
      setPaasword(ans)
    
    } , [isChar , isNum , length , setPaasword]) ; 
    
    const copyPassword = () => {
      paaswordRef.current?.select() 
      window.navigator.clipboard.writeText(paasword)
    }

    useEffect(() => {
      setPaasword("")
    } , [length , isChar , isNum]) 
  
    return (
    <>

      <div className="w-screen h-screen flex justify-center bg-zinc-900">

          <div className="mt-9 p-3 w-[50%] h-[150px] bg-gray-700 rounded-md">
            <div className="flex flex-row justify-between items-center">

              <input 
                className="px-2 w-[42vw] text-green-500 font-medium outline-none rounded-l-md" 
                type="text" placeholder="Password" value={paasword} 
                ref={paaswordRef}
              />
              <button 
              className="bg-green-500 px-2 py-1 w-[6vw] text-[1.05vw] rounded-r-md font-medium hover:bg-green-400 transition-all"
              onClick={() => copyPassword()}
              >
                Copy
              </button>
            
            </div>

            <button onClick={() => paaswordGenerator()} className="bg-orange-500 w-full my-2 rounded-md hover:bg-orange-300 transition-all text-[1.5vw] font-medium">Generate Password</button>
            
            <div className="flex flex-row justify-between items-center w-[42vw] my-6 text-green-700 font-medium">

              <div className="flex gap-1 items-center justify-center"> 

                <input 
                  type="range" min={6} max={50} value={length} 
                  onChange={(e) => {setLength(e.target.value)}}
                />
                <label>{length}</label>
              
              </div>

              <div className="flex gap-1 items-center justify-center">

                <input 
                  type="checkbox" name="Numbers" id="" value={isNum}
                  onChange={() => {setIsNum((prev) => !prev)}}
                />
                <label>Number</label>

              </div>

              <div className="flex gap-1 items-center justify-center">

                <input 
                  type="checkbox" name="Characters" id="" value={isChar}
                  onChange={() => {setIsChar((prev) => !prev)}}
                />
                <label>Character</label>

              </div>

            </div>

          </div>

      </div>
      
    </>
  )
}

export default App