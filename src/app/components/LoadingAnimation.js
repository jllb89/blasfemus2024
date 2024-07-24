'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from '../LoadingAnimation.module.css';

const LoadingAnimation = ({ onComplete }) => {
  const leftBlock = useRef(null);
  const rightBlock = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    timeline
      .to(leftBlock.current, {
        x: '-100%',
        duration: 2,
        ease: 'power4.out', // Using power4.out for faster start and slower end
        delay: 3,
      })
      .to(
        rightBlock.current,
        {
          x: '100%',
          duration: 2,
          ease: 'power4.out', // Using power4.out for faster start and slower end
        },
        '-=2'
      );
  }, [onComplete]);

  return (
    <div className={styles.loadingContainer}>
      <div className={`${styles.block} ${styles.leftBlock}`} ref={leftBlock}></div>
      <div className={`${styles.block} ${styles.rightBlock}`} ref={rightBlock}></div>
    </div>
  );
};

export default LoadingAnimation;
