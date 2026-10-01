import { useEffect, useRef } from "react";
import Styles from "./style.module.css";

function MeuCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const {width, height} = canvas
    const ctx = canvas.getContext("2d");

    animar()
    
    function animar(){

        ctx.fillStyle = "white"
        ctx.fillRect(0,0,width,height)
        ctx.fillStyle = "black"

        ctx.beginPath();
        ctx.arc(width * Math.abs(Math.sin(Date.now() / 500)), height / 2, 100, 0, 2 * Math.PI);
        ctx.fill();

        requestAnimationFrame(animar)
    }


  }, []);

  return (
    <>
      <canvas ref={canvasRef} id={Styles.meuCanvas} width={600} height={600}></canvas>
    </>
  );
}

export default MeuCanvas;