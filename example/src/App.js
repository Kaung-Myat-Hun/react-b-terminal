import {useState} from 'react'
import React from 'react'

import { BTerminal } from 'react-b-terminal'
import 'react-b-terminal/dist/index.css'

const App = () => {
  const commands = [
    {
      command : 'help',
      output: 'This is command for Terminal: `mail` `hello` `hi` `clear` `close & exit`'
    },
    {
      command : 'hi',
      output : "Hi Iam Bate Thar Terminal"
    },
    {
      command : "mail",
      output: () => {
        const aTag = document.createElement('a');
        aTag.href="mailto:kaungmyathun7@gmail.com";
        document.body.appendChild(aTag);
        aTag.click();
        document.body.removeChild(aTag);
      }
    },
    {
      command : 'hello',
      output: "hello world"
    },
    {
      command: 'clear',
      output: 'clear'
    },
    {
      command: 'close',
      output: 'close'
    },
    {
      command: 'exit',
      output: 'exit'
    }
  ]
  const [show ,setShow] = useState(false)
  const close = () =>{
    setShow(false)
  }
  return (
    <>
      <button onClick={()=> setShow(true)}>show</button>
      {show && <BTerminal close={close} data={commands} main="Bate Thar" />}
    </>
  )
}

export default App
