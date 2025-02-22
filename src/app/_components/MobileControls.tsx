import React from 'react';
import { TiArrowShuffle, TiDeviceDesktop, TiVolumeUp } from 'react-icons/ti';
import styles from './MobileControls.module.css';

type MobileControlsProps = {
  onSwitchVariation: () => void;
  onToggleCrtEffect: () => void;
  onToggleSound: () => void;
}

const MobileControls = ({ onSwitchVariation, onToggleCrtEffect, onToggleSound }: MobileControlsProps) => {
  return (
    <div className={styles.mobileControls}>
      <button onClick={onSwitchVariation}>
        <TiArrowShuffle />
      </button>
      <button onClick={onToggleCrtEffect}>
        <TiDeviceDesktop />
      </button>
      <button onClick={onToggleSound}>
        <TiVolumeUp />
      </button>
    </div>
  );
};

export default MobileControls;
