import React, { useState, useContext, createContext } from "react";
import ReactDOM from "react-dom";
import { Container, Button, Overlay, Inner, Close } from "./styles/player";
import YouTube from 'react-youtube';

export const PlayerContext = createContext();
const opts = {
  height: '500',
  width: '800',
  playerVars: {
    autoplay: 1,
  },
};
const _onReady=(event) => {
  
  event.target.pauseVideo();
}


export default function Player({ children, ...restProps }) {
  const [showPlayer, setShowPlayer] = useState(false);
  const [item, setItem] = useState();
  return (
    <PlayerContext.Provider value={{item, showPlayer, setShowPlayer, setItem }}>
      <Container {...restProps}>{children}</Container>
    </PlayerContext.Provider>
  );
}
 
Player.Video = function PlayerVideo({ src, ...restProps }) {
  const { showPlayer, setShowPlayer } = useContext(PlayerContext);

  return showPlayer
    ? ReactDOM.createPortal(
        <Overlay onClick={() => setShowPlayer(false)} data-testid="player">
          <Inner>
            {/* <video id="netflix-player" controls>
              <source src={src} type="video/mp4" />
            </video> */}
            <YouTube id="netflix-player" videoId={src} opts={opts} onReady={_onReady} />;
            <Close />
          </Inner>
        </Overlay>,
        document.body
      )
    : null;
};

Player.Button = function PlayerButton({ ...restProps }) {
  const { showPlayer, setShowPlayer } = useContext(PlayerContext);
  console.log(showPlayer);
  return (
    <Button
      onClick={() => setShowPlayer((showPlayer) => !showPlayer)}
      {...restProps}
    >
      Play
    </Button>
  );
};
