import React,{useState, Fragment} from 'react'

export const BTerminal = (props) =>{
  return (
      <div style={{
        "color" : "lime",
        "max-width": "100%",
        "width": "100%",
        "height": "500px",
        "backgroundColor": "#4c4c4c",
        "border-radius": "5px",
      }}>
        <TerminalComponent main={props.main} data={props.data} close={props.close} />
      </div>
  )
}

const TerminalComponent = ({main ,data,close}) => {
  const mainText = main
  const [terminalData , setTerminalData] = useState([])
  const [inputData, setInputData] = useState("")
  const submitTerminal = (e) => {
    e.preventDefault();
    if(inputData !== ""){
      const filterCmd = data.filter(item => item.command === inputData.toLowerCase())
    if(filterCmd.length > 0){
      if(typeof(filterCmd[0].output) === "string"){
        if (filterCmd[0].command === 'exit' || filterCmd[0].command === 'close') {
          close()
        }
        if(filterCmd[0].command !== 'clear'){
          if(terminalData.length > 0){
            terminalData[terminalData.length -1]= {
              id: terminalData[terminalData.length -1].id,
              text: mainText,
              inputText: inputData
            }
            setTerminalData([...terminalData,
              {
                id: terminalData[terminalData.length -1].id+1,
                text: mainText,
                inputText: filterCmd[0].output
              },
            {
              id: terminalData[terminalData.length -1].id +2,
              text: mainText,
              inputText: ""
            }
          ])
          }else if (terminalData.length === 0){
            setTerminalData([...terminalData, {
              id: 1,
              text: mainText,
              inputText: inputData
            },
            {
              id: 2,
              text: mainText,
              inputText: filterCmd[0].output
            },
            {
              id: 3,
              text: mainText,
              inputText: ""
            }
          ])
          }
        }else{
          setTerminalData([])
        }
      }else if(typeof(filterCmd[0].output) === "function"){
        filterCmd[0].output()
        setTerminalData([...terminalData,
          {
            id: terminalData[terminalData.length -1].id+1,
            text: terminalData[terminalData.length -1].text,
            inputText: inputData
          },
        {
          id: terminalData[terminalData.length -1].id +2,
          text: mainText,
          inputText: ""
        }
      ])
      }
    }else if(filterCmd.length === 0){
      if(terminalData.length > 0){
        terminalData[terminalData.length -1]= {
          id: terminalData[terminalData.length -1].id,
          text: mainText,
          inputText: inputData
        }
        setTerminalData([...terminalData,
          {
            id: terminalData[terminalData.length-1].id+1,
            text: mainText,
            inputText: `Error: This command '${inputData}' is not supported in this terminal`
          },{
            id: terminalData[terminalData.length-1].id+2,
            text: mainText,
            inputText:""
          }
      ])
      }else{
        terminalData[0]= {
          id: 1,
          text: mainText,
          inputText: inputData
        }
        setTerminalData([...terminalData,
          {
            id: 2,
            text: mainText,
            inputText: `Error: This command '${inputData}' is not supported in this terminal`
          },{
            id: 3,
            text: mainText,
            inputText: ""
          }
      ])
      }
    }
    setInputData("")
    }
  }
  const inputHandler = (e) => {
    setInputData(e.target.value)
  }
  return (
    <div style={{
      "color" : "lime",
      "overflowY": "scrol",
      "height": "90%"
    }}>
      <div >
        <code>Welcome to {mainText} Terminal {'!'} </code>
      </div>
      {terminalData.length === 0 && (
        <form onSubmit={submitTerminal}>
            <code>~ {mainText}: {'$'} </code> 
            <input type="text" style={{
              "color" : "lime",
              "width": "calc(100% - 17vw)",
              "backgroundColor": "transparent",
              "border": "none",
              "outline": "none",
              "focus" : {
                "outline": "none"
              }
            }} onChange={inputHandler} autoFocus={true} />
        </form>
      )}
      {
        terminalData.length > 0 && (
          terminalData.map((item) =>(
            <form key={item.id} onSubmit={submitTerminal}>
              <code>~ {item.text}: {'$'} </code> 
              {item.id === terminalData[terminalData.length-1].id ? (
                <input type="text" style={{
                  "color" : "lime",
                  "width": "calc(100% - 17vw)",
                  "backgroundColor": "transparent",
                  "border": "none",
                  "outline": "none",
                  "focus" : {
                    "outline": "none"
                  }
                }} onChange={inputHandler} autoFocus={true} />
              ) : (
                <span>{item.inputText}</span>
              )}
            </form>
          ))
        )
      }
    </div>
  )
}
