import "../css/style.css";
import "../css/form.css";
import Head from "next/head";
import Link from "next/link";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Game App</title>
      </Head>

      <div className="top-bar">
        <div className="nav">
          <Link href="/">Home</Link>
          <Link href="/new">New Game</Link>
        </div>

        <img
          id="title"
          src="https://upload.wikimedia.org/wikipedia/commons/1/1f/Pet_logo_with_flowers.png"
          alt="game care logo"
        ></img>
      </div>
      <div className="wrapper grid">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
