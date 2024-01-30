import React, { useRef } from "react";

import './Footer.scss';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";


export const Footer = () => {
  const footer = useRef();

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.set(footer.current, {
      clipPath: 'inset(25% 0 0 0)',
    })

    gsap.to(footer.current, {
      clipPath: 'inset(0% 0 0 0)',
      scrollTrigger: {
        trigger: footer.current,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: true,
      }
    })
  })
  return (
    <footer className="footer" ref={footer}>
      <div className="footer__card">
        <img src="/logo.svg" alt="logo" className="logo" />
        <h1 className="footer__title">
          first agency that connects brands & creative partners
        </h1>
          <p>Contact us:</p>
          <ul>
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">Dribble</a>
            </li>
            <li>
              <a href="#">Behance</a>
            </li>
          </ul>
      </div>
    </footer>
  );
};
