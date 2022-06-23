import React, { useEffect, useState } from "react";
import { IConfig } from "../../interfaces/config";
import axios from "axios";
import toast from "react-hot-toast";
import { Microphone, PaperPlaneTilt, Spinner, Stop } from "phosphor-react";

const MicRecorder = require("mic-recorder-to-mp3");

interface Props {
  config: IConfig;
}

const AudioDemo: React.FC<Props> = ({ config }: Props) => {
  const [status, setStatus] = useState("WAITING");
  const [microfone, setMicrofone] = useState<any>(null);
  const [audio, setAudio] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMicrofone(
      new MicRecorder({
        bitRate: 128,
      })
    );
  }, []);

  const onRec = () => {
    setStatus("REC");
    microfone.start();
  };

  const onStop = () => {
    setStatus("SEND");
    microfone
      .stop()
      .getMp3()
      .then((response: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(response[1]);
        reader.onloadend = () => {
          setAudio(reader.result);
        };
      });
  };

  const onSend = () => {
    if (!config.phone || !config.token || !config.instance) {
      toast.error(
        "Preencha todos os campos da configuração para relizar o envio"
      );
      return;
    }
    setLoading(true);
    axios
      .post(
        `https://api.z-api.io/instances/${config.instance}/token/${config.token}/send-audio`,
        {
          phone: config.phone,
          audio,
        }
      )
      .then(() => {
        toast.success("Enviado com sucesso!");
        setLoading(false);
        setStatus("WAITING");
      })
      .catch((e) => {
        setLoading(false);
        toast.error(
          "ERRO: Revise os dados informados e se a instância está conectada!"
        );
      });
  };

  return (
    <div className="demo-audio-wrapper">
      <h3>Envio de áudio</h3>
      <p>Grave um aúdio abaixo e teste o envio pelo Z-API</p>
      <div className="demo-content">
        {status === "WAITING" && (
          <div className="rec-wrapper">
            <div className="rec" onClick={() => onRec()}>
              <Microphone size={82} />
            </div>
            <label>Grave um áudio</label>
          </div>
        )}
        {status === "REC" && (
          <div className="stop-wrapper">
            <div className="stop pulse" onClick={() => onStop()}>
              <Stop size={82} color="rgb(224, 47, 47)" />
            </div>
            <label>Finalize o áudio</label>
          </div>
        )}
        {status === "SEND" && !loading && (
          <div className="send-wrapper">
            <div className="send" onClick={() => onSend()}>
              <PaperPlaneTilt size={82} color="rgb(15, 184, 18)" />
            </div>
            <label>Clique no botão para enviar</label>
          </div>
        )}
        {status === "SEND" && loading && (
          <div className="send-wrapper">
            <div className="send">
              <Spinner className="rotating" size={82} color="white" />
            </div>
            <label>Enviando...</label>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioDemo;
