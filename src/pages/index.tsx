import React, { useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { verificaLetra } from '../utils/script';

const Home: React.FC = () => {
  useEffect(() => {
    // Funções de inicialização aqui, como configurar o canvas ou o teclado
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Jogo da Forca</title>
        <meta name="description" content="Hangman Game using Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1>Jogo da Forca</h1>
        <h3>Challenge Oracle One</h3>
      </header>

      <section className="container">
        <div id="result">Boa sorte!</div>
        <div>
          <canvas id="tela" width="510" height="360"></canvas>
        </div>
        <div id="palavra"></div>
        <div id="dica"></div>
        <div className="dbtn">
          <div id="btnNovoJogo" onClick={() => verificaLetra('Novo Jogo')}>Novo Jogo</div>
        </div>

        <div className="key-b">
          {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((letter) => (
            <div key={letter} id={`idkey-${letter}`} onClick={() => verificaLetra(letter)} className="key">{letter}</div>
          ))}
        </div>
        <div className="key-b">
          {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç'].map((letter) => (
            <div key={letter} id={`idkey-${letter}`} onClick={() => verificaLetra(letter)} className="key">{letter}</div>
          ))}
        </div>
        <div className="key-b">
          {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((letter) => (
            <div key={letter} id={`idkey-${letter}`} onClick={() => verificaLetra(letter)} className="key">{letter}</div>
          ))}
        </div>
      </section>

      <footer>
        <p>Peterson 2022</p>
      </footer>
    </div>
  );
}

export default Home;
