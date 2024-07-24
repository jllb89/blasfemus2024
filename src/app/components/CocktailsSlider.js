'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import styles from './CocktailsSlider.module.css';

const CocktailsSlider = () => {
  const containerRef = useRef(null);
  const leftImageRef = useRef(null);
  const centerImageRef = useRef(null);
  const rightImageRef = useRef(null);
  const titleRef = useRef(null);
  const linkRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 3;

  useEffect(() => {
    updateSlides(currentSlide);
  }, [currentSlide]);

  const updateSlides = (index) => {
    const images = [
      leftImageRef.current,
      centerImageRef.current,
      rightImageRef.current
    ];

    const isMobile = window.innerWidth <= 900;

    images.forEach((img, i) => {
      if (i === 1) { // center image
        gsap.to(img, { 
          scale: 1.2, 
          height: isMobile ? '40vh' : '60vh', 
          duration: 1, 
          ease: 'power2.out' 
        });
      } else {
        gsap.to(img, { 
          scale: 1, 
          height: isMobile ? '30vh' : '40vh', 
          duration: 1, 
          ease: 'power2.out' 
        });
      }
    });

    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.5 }
    );
    gsap.fromTo(linkRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.7 }
    );
  };

  const changeProduct = (index) => {
    gsap.to([titleRef.current, linkRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.to([leftImageRef.current, centerImageRef.current, rightImageRef.current], {
          scale: 0.9,
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut',
          onComplete: () => {
            setCurrentSlide(index);
            gsap.fromTo([leftImageRef.current, centerImageRef.current, rightImageRef.current], {
              scale: 2,
              opacity: 0,
            }, {
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: 'power2.inOut',
            });
          },
        });
      }
    });
  };

  const nextSlide = () => {
    changeProduct((currentSlide + 1) % totalSlides);
  };

  const previousSlide = () => {
    changeProduct((currentSlide - 1 + totalSlides) % totalSlides);
  };

  const getImageSrc = (index) => {
    switch(index) {
      case 0: return "/img1.jpg";
      case 1: return "/img2.jpg";
      case 2: return "/img3.png";
      default: return "/img1.jpg";
    }
  };

  const getImageTitle = (index) => {
    switch(index) {
      case 0: return "Old Texan";
      case 1: return "Texan Margarita";
      case 2: return "Texan Mule";
      default: return "Old Texan";
    }
  };

  const getImageLink = (index) => {
    switch(index) {
      case 0: return "https://www.instagram.com/p/CzVEgd_ulDX/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==";
      case 1: return "https://www.instagram.com/p/Czw11bMuXO3/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==";
      case 2: return "https://www.instagram.com/p/C0P5oS-uhMy/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==";
      default: return "https://www.instagram.com/p/CzVEgd_ulDX/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==";
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const leftColumn = leftImageRef.current.parentElement;
      const rightColumn = rightImageRef.current.parentElement;
      const mouseX = e.clientX;
      const docWidth = window.innerWidth;

      const targetOffsetLeft = 0.2 * ((mouseX / docWidth) * leftColumn.offsetWidth - mouseX / 2);
      const targetOffsetRight = 0.2 * ((mouseX / docWidth) * rightColumn.offsetWidth - mouseX / 2);

      gsap.to(leftColumn, {
        x: targetOffsetLeft,
        duration: 1,
        ease: 'power2.out',
      });

      gsap.to(rightColumn, {
        x: targetOffsetRight,
        duration: 1,
        ease: 'power2.out',
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    gsap.to(containerRef.current, {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  return (
    <div className={styles.sliderContainer} ref={containerRef}>
      <div className={styles.column} onClick={previousSlide}>
        <Image ref={leftImageRef} src={getImageSrc((currentSlide - 1 + totalSlides) % totalSlides)} alt="Previous Cocktail" width={600} height={800} />
      </div>
      <div className={styles.column}>
        <Image ref={centerImageRef} src={getImageSrc(currentSlide)} alt="Current Cocktail" width={600} height={800} />
        <div className={styles.imageTitle} ref={titleRef}>{getImageTitle(currentSlide)}</div>
        <a href={getImageLink(currentSlide)} target="_blank" rel="noopener noreferrer" className={styles.imageLink} ref={linkRef}>Serve Yourself</a>
      </div>
      <div className={styles.column} onClick={nextSlide}>
        <Image ref={rightImageRef} src={getImageSrc((currentSlide + 1) % totalSlides)} alt="Next Cocktail" width={600} height={800} />
      </div>
    </div>
  );
};

export default CocktailsSlider;
