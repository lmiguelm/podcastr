import { Header } from '../components/Header';
import { Player } from '../components/Player';

import '../styles/global.scss';
import styles from '../styles/app.module.scss';
import { PlayerProvider } from '../contexts/PlayerContext';
import { PlayerMobile } from '../components/PlayerMobile';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  useEffect(() => {
    console.log(navigator.userAgent);
  });

  return (
    <PlayerProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>

        {isMobile ? <PlayerMobile /> : <Player />}
      </div>
    </PlayerProvider>
  );
}

export default MyApp;
