import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}

const Lofi = () => {
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<YT.Player | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    let youtubeScript: HTMLScriptElement | null = null;

    const initializePlayer = () => {
      if (!isMountedRef.current || !playerContainerRef.current) return;

      // Create temporary container outside of React's DOM
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = `
        <iframe 
          width="0" 
          height="0" 
          src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&enablejsapi=1&controls=0&mute=0"
          allow="autoplay; encrypted-media"
          style="display: none;"
        ></iframe>
      `;

      const iframe = tempDiv.firstElementChild as HTMLIFrameElement;

      // Initialize YT.Player safely
      const onYouTubeIframeAPIReady = () => {
        if (isMountedRef.current && iframe) {
          playerInstanceRef.current = new window.YT.Player(iframe, {
            events: {
              onReady: (event) => {
                event.target.setVolume(20);
                event.target.playVideo();
              }
            }
          });

          // Attach to React's DOM after initialization
          if (playerContainerRef.current) {
            playerContainerRef.current.appendChild(iframe);
          }
        }
      };

      // Handle existing API
      if (window.YT?.Player) {
        onYouTubeIframeAPIReady();
      } else {
        window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
      }
    };

    if (!window.YT) {
      youtubeScript = document.createElement('script');
      youtubeScript.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(youtubeScript);
    }

    // Delay initialization to ensure API setup
    const initTimeout = setTimeout(initializePlayer, 100);

    return () => {
      isMountedRef.current = false;
      clearTimeout(initTimeout);

      // Cleanup player
      if (playerInstanceRef.current) {
        try {
          playerInstanceRef.current.destroy();
        } catch (e) {
          console.log('Player cleanup error:', e);
        }
      }

      // Remove iframe manually
      if (playerContainerRef.current) {
        playerContainerRef.current.innerHTML = '';
      }

      // Cleanup script
      if (youtubeScript) {
        document.body.removeChild(youtubeScript);
      }

      // Cleanup global callback
      if (window.onYouTubeIframeAPIReady === initializePlayer) {
        window.onYouTubeIframeAPIReady = () => {};
      }
    };
  }, []);

  return <div ref={playerContainerRef} />;
};

export default Lofi;
