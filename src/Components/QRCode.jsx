import { useState } from "react";
import "../Styles/QRcode.css";

export const QRcode = () => {
  const [img, setImg]=useState("");
  const [loading, setloading]=useState(false);
  const [qrData, setqrdata]=useState("");
  const [qrSize, setQrSize]=useState("");
  
async function generateqr(){
  
     try{
      const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${qrData}`;
      setImg(url);

     }catch(error){
      console.error("Errror in generating QR", error);
     }
     finally{
      setloading(false);
     }
  }
  function downloadqr(){
    fetch(img)
    .then((response)=>response.blob())
    .then((blob)=>{
      const link= document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download="qrcode.png"
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error)=>{
      console.error("Error in downlaoding",error);
    });

  }
  return (
    <div className="app-container">
      <h1>QR CODE GENERATOR</h1>
    {loading && <p>Please Wait...</p>}
        {/* <img  src={img} className="qrimage"/> */}
        {/* this is conditional rendering such that it will not show image not found error if no image is loaded */}
        {img && <img src={img} className="qrimage"/>}
        <div>
            <label htmlFor="dataInput" className="input-label">
                Paste Your Link:
            </label>
            <input type="text" id="dataInput" placeholder="Enter Url to generate QR Code" value={qrData}
              onChange={(event)=>setqrdata(event.target.value)}
            />

            <label htmlFor="dataInput" className="input-label">
                Enter Image size
            </label>
            <input type="text" id="dataInput" placeholder="E.g 150"  value={qrSize} 
            onChange={(event)=>setQrSize(event.target.value)}/>
            <button className="generate-button"  disabled={loading} onClick={generateqr}>Generate QR code</button>
            <button className="download-button" onClick={downloadqr}>Download QR Code</button>

        </div>

        <p className="footer">Designed by <a href="https://nishanthnishatzz.rf.gd/">Nishanth Chandrasekaran</a></p>

    </div>
  )
}
