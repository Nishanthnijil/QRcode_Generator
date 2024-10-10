import { useState } from 'react'
import { QRcode } from './Components/QRCode'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <QRcode/>
    </>
  )
}

export default App
