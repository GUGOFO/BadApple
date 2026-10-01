import { useEffect, useRef } from "react";
import Styles from "./style.module.css";
import badAppleVideo from "../assets/badapple.mp4";

function MeuCanvas({ comAudio }) {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  // Reage imediatamente a alterações da prop `comAudio` enviada pelo App
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !comAudio;
      if (comAudio) {
        videoRef.current.play().catch((err) => console.error("Erro ao reproduzir áudio:", err));
      }
    }
  }, [comAudio]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const tamanhoCelula = 12;

    const video = document.createElement("video");
    video.src = badAppleVideo;
    video.muted = !comAudio;
    video.loop = true;
    videoRef.current = video;

    let animacaoId;

    const redimensionarCanvas = () => {
      if (!video.videoWidth) return;

      const margemTela = 0.9;
      const larguraMaxima = Math.min(800, window.innerWidth * margemTela);
      const proporcao = video.videoHeight / video.videoWidth;

      canvas.width = larguraMaxima;
      canvas.height = larguraMaxima * proporcao;
    };

    video.addEventListener("loadeddata", () => {
      redimensionarCanvas();
      video.play().catch((err) => console.error("Erro ao iniciar vídeo:", err));
      animar();
    });

    window.addEventListener("resize", redimensionarCanvas);

    function animar() {
      const { width, height } = canvas;
      if (!width || !height) return;

      ctx.drawImage(video, 0, 0, width, height);

      const dadosDaImagem = ctx.getImageData(0, 0, width, height);
      const dados = dadosDaImagem.data;

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${tamanhoCelula}px Arial`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillStyle = "black";

      const distancia = 10;

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
            ctx.fillText(
              String.fromCharCode(Math.floor(Math.random() * (90 - 65) + 65)),
              x,
              y
            );
          }
        }
      }

      animacaoId = requestAnimationFrame(animar);
    }

    return () => {
      cancelAnimationFrame(animacaoId);
      window.removeEventListener("resize", redimensionarCanvas);
      video.pause();
    };
  }, []);

  return <canvas ref={canvasRef} className={Styles.meuCanvas}></canvas>;
}

export default MeuCanvas;