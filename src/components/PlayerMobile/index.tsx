import { useContext, useEffect, useRef } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext';
import Marquee from 'react-fast-marquee';

import styles from './styles.module.scss';

export const PlayerMobile = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const {
    isPlaying,
    togglePlay,
    episodeList,
    currentEpisodeIndex,
    isLooping,
    setPlayingState,
    clearPlayerState,
    playNext,
    hasNext,
    playPrevious,
    hasPrevious,
  } = useContext(PlayerContext);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  function handleEpisodeEnded() {
    if (hasNext) {
      playNext();
    } else {
      clearPlayerState();
    }
  }

  const episode = episodeList[currentEpisodeIndex];

  if (episode) {
    return (
      <footer className={styles.playerContainer}>
        <Marquee
          gradient={false}
          speed={50}
          direction="left"
          delay={500}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0.5rem',
            overflow: 'hidden',
          }}
        >
          <strong>{episode.title}</strong>
        </Marquee>

        <div className={styles.buttonsContainer}>
          <button type="button" disabled={!episode || !hasPrevious} onClick={() => playPrevious()}>
            <img src="/play-previous.svg" alt="tocar próxima" />
          </button>
          <button type="button" className={styles.playButton} onClick={() => togglePlay()}>
            {isPlaying ? (
              <img src="/pause.svg" alt="pausar" />
            ) : (
              <img src="/play.svg" alt="tocar" />
            )}
          </button>
          <button type="button" disabled={!episode || !hasNext} onClick={() => playNext()}>
            <img src="/play-next.svg" alt="tocar próxima" />
          </button>
        </div>

        <audio
          onPause={() => setPlayingState(false)}
          onPlay={() => setPlayingState(true)}
          ref={audioRef}
          src={episode.url}
          autoPlay
          loop={isLooping}
          onEnded={handleEpisodeEnded}
        />
      </footer>
    );
  } else {
    return (
      <Marquee>
        <p style={{ color: 'black' }}>kajsduihausdhuashduahsdhuahsduhasudhaushd</p>{' '}
      </Marquee>
    );
  }
};
