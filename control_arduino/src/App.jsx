import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import mqtt from 'mqtt';

const optionsX = {
    host: '45920dc8e8b947d9b25f35ee5c85344f.s1.eu.hivemq.cloud/mqtt',
    port: 8884,
    protocol: 'wss',
    username: 'pub_n_sub',
    password: 'Isa940722'
}



function App() {
  const [count, setCount] = useState(0)
  const [rgb, setrgb] = useState('#00f')
//   const client = mqtt.connect('wss://45920dc8e8b947d9b25f35ee5c85344f.s1.eu.hivemq.cloud:8884/mqtt'); // Connect to a public broker
//   const client = mqtt.connect(optionsX);
const client = mqtt.connect('wss://45920dc8e8b947d9b25f35ee5c85344f.s1.eu.hivemq.cloud:8884/mqtt', {
  username: optionsX.username,
  password: optionsX.password
});

  client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe('testtopic/1', (err) => {
      if (!err) {
        client.publish('testtopic/1', 'Hello from my JS client!'+Date.now());
      }
    });
  });

  client.on('message', (topic, message) => {
    // message is a Buffer
    const msg= message.toString();
    console.log('Received message:', msg);
    try{

    const msg_obj= JSON.parse(msg);
    if (msg_obj!==undefined && msg_obj.rgb!==undefined){
        setrgb(msg_obj.rgb)
        }
    }catch(err){
        console.log('err:', err);
        }
    // client.end() to disconnect
  });

  client.on('error', (error) => {
    console.error('Error:', error);
  });


  return (
    <>
      <section id="center" style={{background: rgb}}>
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>演唱會</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          className="counter"
          onClick={() => {
              setCount((count) => count + 1)
              client.publish('testtopic/1',
                  JSON.stringify({ts: Date.now(), count: count, rgb: '#f00'}))
              }}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="./icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="./icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="./icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="./icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="./icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
