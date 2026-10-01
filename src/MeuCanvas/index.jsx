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

    
    function animar() {
  const { width, height } = canvas;
  
  ctx.drawImage(video, 0, 0, width, height);

  const dadosDaImagem = ctx.getImageData(0, 0, width, height);
  const dados = dadosDaImagem.data;

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);

  ctx.font = tamanhoCelula + "px Arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  const distancia = 20;

  for (let x = distancia / 2; x < width; x += distancia) {
    for (let y = distancia / 2; y < height; y += distancia) {
      const px = Math.floor(x);
      const py = Math.floor(y);
      const i = (py * width + px) * 4;

      const r = dados[i];
      const g = dados[i + 1];
      const b = dados[i + 2];

      const luminosidade = (r + g + b) / 3;

      if (luminosidade < 128) {
        ctx.fillText("🍎", x, y);
      }
    }
  }

  requestAnimationFrame(animar);
}


  }, []);

  return (
    <>
      <canvas ref={canvasRef} id={Styles.meuCanvas}></canvas>
    </>
  );
}

export default MeuCanvas;