import { useEffect, useRef } from "react";
import Styles from "./style.module.css";

import badAppleVideo from "../assets/badapple.mp4";

function MeuCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const tamanhoCelula = 24
    const ctx = canvas.getContext("2d");

    const video = document.createElement("video")
    video.src = badAppleVideo
    video.muted = true; 
    video.loop = true;
    video.play()

    video.addEventListener("loadeddata", () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight

        animar()
    })

    
    function animar(){
        const {width, height} = canvas

        ctx.font = tamanhoCelula + "px Arial"
        ctx.textBaseline = "middle"
        ctx.textAlign = "center"

        ctx.drawImage(video, 0, 0, width, height)

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
      <canvas ref={canvasRef} id={Styles.meuCanvas}></canvas>
    </>
  );
}

export default MeuCanvas;