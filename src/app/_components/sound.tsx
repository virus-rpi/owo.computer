"use client";
import { useEffect, useRef } from "react";

function playPlopSound(audioContext: AudioContext) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime); // Start frequency
    gainNode.gain.setValueAtTime(1, audioContext.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();

    oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.2);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);

    oscillator.stop(audioContext.currentTime + 0.2);
}

export default function Sound({ crtEffect, text }: { crtEffect: boolean, text: string }) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const whiteNoiseRef = useRef<AudioBufferSourceNode | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

    useEffect(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        }
        const audioContext = audioContextRef.current;
        playPlopSound(audioContext)

        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close().then();
                audioContextRef.current = null;
            }
        }
    }, [text])

  useEffect(() => {
    if (crtEffect) {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const audioContext = audioContextRef.current;

        const bufferSize = 4096
        const pinkNoise = (function () {
            let b0: number, b1: number, b2: number, b3: number, b4: number, b5: number, b6: number
            b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0
            const node = audioContext.createScriptProcessor(bufferSize, 1, 1)
            node.onaudioprocess = function ( e ) {
                const output = e.outputBuffer.getChannelData(0)
                for (let i = 0; i < bufferSize; i++) {
                    const white = Math.random() * 2 - 1
                    b0 = 0.99886 * b0 + white * 0.0555179
                    b1 = 0.99332 * b1 + white * 0.0750759
                    b2 = 0.96900 * b2 + white * 0.1538520
                    b3 = 0.86650 * b3 + white * 0.3104856
                    b4 = 0.55000 * b4 + white * 0.5329522
                    b5 = -0.7616 * b5 - white * 0.0168980
                    output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362
                    output[i] *= 0.01
                    b6 = white * 0.115926
                }
            }
            return node
        })()

      pinkNoise.connect(audioContext.destination);

      const oscillator = audioContext.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime);

      const gainNode = audioContext.createGain();
      gainNode.gain.setValueAtTime(0.01, audioContext.currentTime);

      oscillator.connect(gainNode).connect(audioContext.destination);
      oscillator.start();

      oscillatorRef.current = oscillator;
    } else {
      if (whiteNoiseRef.current) {
        whiteNoiseRef.current.stop();
        whiteNoiseRef.current = null;
      }
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
      }
    }

    return () => {
      if (whiteNoiseRef.current) {
        whiteNoiseRef.current.stop();
        whiteNoiseRef.current.disconnect();
        whiteNoiseRef.current = null;
      }
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().then();
        audioContextRef.current = null;
      }
    };
  }, [crtEffect]);

  return null;
}