import "./App.css";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import AudioDemo from "./components/audio-demo";

function App() {
  const [config, setConfig] = useState<any>({
    instance: "",
    token: "",
  });

  return (
    <div className="App">
      <Toaster />
      <header className="App-header">
        <div className="config">
          <div className="logo">
            <img
              width={400}
              src="https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg"
            />
          </div>

          <label className="config-label">Realize as configurações</label>
          <div className="config-instance">
            <div className="">
              <div className="div-content">
                <label>Instância</label>
                <input
                  className=""
                  placeholder="ID da instância"
                  value={config.instance}
                  onChange={(evt) =>
                    setConfig({ ...config, instance: evt.target.value })
                  }
                />
              </div>
              <div className="div-content">
                <label>Token</label>
                <input
                  className=""
                  placeholder="Token da instância"
                  value={config.token}
                  onChange={(evt) =>
                    setConfig({ ...config, token: evt.target.value })
                  }
                />
              </div>
            </div>
            <div className="phone-wrapper">
              <div className="div-content">
                <label>Telefone</label>
                <input
                  className="phone"
                  placeholder="Telefone para receber a mensagem"
                  value={config.phone}
                  onChange={(evt) =>
                    setConfig({ ...config, phone: evt.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="demo-wrapper">
          <AudioDemo config={config} />
        </div>
      </header>
    </div>
  );
}

export default App;
