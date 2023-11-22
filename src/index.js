import {useState, Fragment} from 'react'
import React from 'react'
import styles from './styles.module.css'

export const BTerminal = (props) =>{
  return (
      <div className={styles.container}>
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
    <div className={styles.terminalContainer}>
      <div className={styles.terminalbox}>
        <code>Welcome to {mainText} Terminal {'!'} </code>
      </div>
      {terminalData.length === 0 && (
        <form className={styles.terminalbox} onSubmit={submitTerminal}>
            <code>~ {mainText}: {'$'} </code> 
            <input type="text" className={styles.terminalInput} onChange={inputHandler} autoFocus={true} />
        </form>
      )}
      {
        terminalData.length > 0 && (
          terminalData.map((item) =>(
            <form key={item.id} className={styles.terminalbox} onSubmit={submitTerminal}>
              <code>~ {item.text}: {'$'} </code> 
              {item.id === terminalData[terminalData.length-1].id ? (
                <input type="text" className={styles.terminalInput} onChange={inputHandler} autoFocus={true} />
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
