# react-b-terminal

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/react-b-terminal.svg)](https://www.npmjs.com/package/react-b-terminal) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-b-terminal
```

## Usage

```jsx
import React ,{ useState } from 'react'

import { BTerminal } from 'react-b-terminal'
import 'react-b-terminal/dist/index.css'

function myComponent(){
  const [show, setShow] = useState(false)
  const data = [{
    command : "hello",
    output: "world"
  },
  {
    command : "close",
    output: "close"
  },
  {
    command : "help",
    output : "this is help message for your terminal"
  }
  ]
  const close = () =>{ // command is close and exit this is default 
    setShow(false);
  }
  render() {
    return <BTerminal close={close} main="this is main text" data={data} />
  }
}
```

## License

MIT © [https://github.com/Kaung-Myat-Hun](https://github.com/https://github.com/Kaung-Myat-Hun)
