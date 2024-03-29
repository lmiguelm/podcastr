import { createContext, useState } from 'react';

type IPlayerContextProps = {
  children: React.ReactNode;
};

type IEpisode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type IPlayerContextData = {
  episodeList: IEpisode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  play: (episode: IEpisode) => void;
  togglePlay: () => void;
  setPlayingState: (state: boolean) => void;
  playList: (list: IEpisode[], index: number) => void;
  playPrevious: () => void;
  playNext: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  isLooping: boolean;
  toggleLoop: () => void;
  isShuffling: boolean;
  toggleShuffle: () => void;
  clearPlayerState: () => void;
};

export const PlayerContext = createContext({} as IPlayerContextData);

export function PlayerProvider({ children }: IPlayerContextProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  function play(episode: IEpisode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: IEpisode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toggleLoop() {
    setIsLooping(!isLooping);
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length;

  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  function clearPlayerState() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        isPlaying,
        togglePlay,
        setPlayingState,
        playList,
        playNext,
        playPrevious,
        hasPrevious,
        hasNext,
        toggleLoop,
        isLooping,
        toggleShuffle,
        isShuffling,
        clearPlayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
