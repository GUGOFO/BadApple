import { useEffect, useRef } from "react";
import Styles from "./style.module.css";

function MeuCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const {width, height} = canvas
    const tamanhoCelula = 24
    const ctx = canvas.getContext("2d");

    animar()
    
    function animar(){
        ctx.font = tamanhoCelula + "px Arial"
        ctx.textBaseline = "middle"
        ctx.textAlign = "center"

        ctx.fillStyle = "white"
        ctx.fillRect(0,0,width,height)
        ctx.fillStyle = "black"

        ctx.beginPath();
        ctx.arc(width * Math.abs(Math.sin(Date.now() / 1000)), height / 2, 100, 0, 2 * Math.PI);
        ctx.fill();

        const dadosDaImagem = ctx.getImageData(0,0,width,height)
        const dados = dadosDaImagem.data
        const distancia = 20;

        for(let x = 0; x < width; x += distancia){
            for(let y = 0; y < height; y += distancia){
                const i = (y * width + x) * 4;
                if(dados[i] != 255){
                    ctx.fillText("🍎", x, y)
                }
            }
        }

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