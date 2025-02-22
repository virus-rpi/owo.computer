import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}

const Lofi = () => {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPlayerReady = (event: YT.PlayerEvent) => {
      event.target.setVolume(20);
      event.target.playVideo();
    };

    const createPlayer = () => {
      if (window.YT && playerRef.current) {
        new window.YT.Player(playerRef.current, {
          height: '0',
          width: '0',
          videoId: 'jfKfPfyJRdk',
          playerVars: {
            autoplay: 1,
            controls: 0,
            mute: 0
          },
          events: {
            onReady: onPlayerReady
          }
        });
      }
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = createPlayer;
    } else {
      createPlayer();
    }
  }, []);

  return <div id="player" ref={playerRef} />;
};

export default Lofi;
