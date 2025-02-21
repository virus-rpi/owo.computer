import React from 'react';
import { TiArrowShuffle, TiDeviceDesktop } from 'react-icons/ti';
import styles from './MobileControls.module.css';

type MobileControlsProps = {
  onSwitchVariation: () => void;
  onToggleCrtEffect: () => void;
}

const MobileControls = ({ onSwitchVariation, onToggleCrtEffect }: MobileControlsProps) => {
  return (
    <div className={styles.mobileControls}>
      <button onClick={onSwitchVariation}>
        <TiArrowShuffle />
      </button>
      <button onClick={onToggleCrtEffect}>
        <TiDeviceDesktop />
      </button>
    </div>
  );
};

export default MobileControls;
