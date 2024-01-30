import React, { useEffect, useRef } from 'react'

import './Hero.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';

const getRandomImage = () => {
  return Math.floor(Math.random() * 7);
}

export const Hero = () => {
  const hero = useRef();
  const card = useRef();

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap
    .timeline({
      scrollTrigger: {
        trigger: hero.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    })
    .to(card.current, {
      clipPath: 'inset(0 0 20% 0)',
      yPercent: -60,
      ease: 'none',
    })
    .to(hero.current, {
      backgroundPositionY: '30%'
    }, 0)
  })

  return (
    <div className="hero" ref={hero} style={{ backgroundImage: `url(/images/hero/hero-${getRandomImage()}.jpg)` }}>
      <div className="hero__card" ref={card}>
        <img src="/logo.svg" alt="logo" className="logo"/>
        <h1 className="hero__title">
          first agency that connects brands & creative partners
        </h1>
      </div>
    </div>
  )
}
