'use client';

import React, { useEffect, useState } from 'react';
import { gsap, Power3, Power4 } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../CatalogOverlay.module.css';

const CatalogOverlay = () => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    useEffect(() => {
        const docWidth = document.body.clientWidth;
        const wrap = document.querySelector(`#${styles.wrap}`);
        const images = document.querySelectorAll(`#${styles.wrap} .${styles.block}`);
        let slidesWidth = wrap.clientWidth;
        let currentOffset = 0;
        let targetOffset = 0;
        let isAnimating = false;

        window.addEventListener('resize', () => {
            slidesWidth = wrap.clientWidth;
        });

        document.addEventListener('mousemove', (e) => {
            const mouseX = e.pageX;
            targetOffset = -1 * ((mouseX / docWidth) * slidesWidth - mouseX / 2);
            if (!isAnimating) {
                requestAnimationFrame(updateOffset);
            }
        });

        const updateOffset = () => {
            isAnimating = true;
            currentOffset = lerp(currentOffset, targetOffset, 0.075);
            if (Math.abs(currentOffset - targetOffset) < 0.5) {
                currentOffset = targetOffset;
                isAnimating = false;
            }
            images.forEach((image) => {
                image.style.transform = `translate3d(${currentOffset}px,0,0)`;
            });
            if (isAnimating) {
                requestAnimationFrame(updateOffset);
            }
        };

        const lerp = (a, b, t) => (1 - t) * a + t * b;

        const tl = gsap.timeline({ paused: true });
        const $path = document.querySelector(`.${styles.path}`);

        const showInfo = () => {
            revealDescription();

            const showBtn = document.getElementById('toggleOverlay');
            showBtn.onclick = () => {
                tl.reversed(!tl.reversed());
                setIsOverlayOpen(!tl.reversed());
            };
        };

        const revealDescription = () => {
            const start = 'M 0 100 V 50 Q 50 0 100 50 V 100 z';
            const end = 'M 0 100 V 0 Q 50 0 100 0 V 100 z';
            tl.to(`.${styles.wines}`, 0.1, {
                opacity: 1,
                ease: 'power2.inOut',
            });

            tl.to($path, 0.8, { attr: { d: start }, ease: Power3.easeIn }).to(
                $path,
                0.4,
                { attr: { d: end }, ease: Power3.easeOut }
            );

            tl.from(`.${styles.block}`, 1, {
                clipPath: 'inset(0 100% 0 0)',
                ease: Power4.easeOut,
                stagger: {
                    amount: 0.25,
                },
            });

            tl.from(
                `.${styles.product} img`,
                1,
                {
                    scale: 3,
                    ease: Power4.easeOut,
                    stagger: {
                        amount: 0.25,
                    },
                },
                '-=1.5'
            );

            tl.from(
                '#closeBtn',
                1,
                {
                    opacity: 0,
                    right: '-25%',
                    ease: 'power2.inOut',
                },
                '-=1'
            ).reverse();
        };

        showInfo();
    }, []);

    const productLinks = [
        "https://blasfemus.passionspirits.com/blasfemus-agave-spirits-7.html",
        "https://blasfemus.passionspirits.com/blasfemus-agave-spirits-11.html",
        "https://blasfemus.passionspirits.com/blasfemus-agave-spirits-17.html"
    ];

    return (
        <div className={styles.container}>
            <button id="toggleOverlay" className={styles.button}>
                {isOverlayOpen ? 'CLOSE X' : 'Buy Blasfemus'}
            </button>
            <div className={styles.wines}>
                <div className={styles.wrapper}>
                    <svg
                        className={styles.transition}
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        style={{ width: '100%', height: '100%' }}
                    >
                        <path
                            id="overlayPath"
                            className={styles.path}
                            vectorEffect="non-scaling-stroke"
                            d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
                        />
                    </svg>
                    <div id={styles.wrap}>
                        {['7.png', '11.png', '17.png'].map((src, index) => (
                            <Link href={productLinks[index]} key={index} target="_blank" rel="noopener noreferrer" className={styles.block}>
                                    <div className={styles.product}>
                                        <Image src={`/${src}`} alt={`BUY BLASFEMUS ${index + 1}`} width={600} height={800} />
                                    </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CatalogOverlay;
