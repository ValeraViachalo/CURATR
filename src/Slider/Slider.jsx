import React, { useEffect, useRef, useState } from "react";
import "./Slider.scss";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";

const titleAnim = {
  initial: {
    transform: "translateY(100%)",
    transition: {
      duration: 0.2,
      easing: [0.24, 0.87, 0.73, 0.61],
    },
  },
  animate: {
    transform: "translateY(0%)",
    transition: {
      duration: 0.2,
      easing: [0.24, 0.87, 0.73, 0.61],
    },
  },
  exit: {
    transform: "translateY(-100%)",
    transition: {
      duration: 0.2,
      easing: [0.24, 0.87, 0.73, 0.61],
    },
  },
};

export const Slider = () => {
  const title = useRef();
  const slider = useRef();
  const section = useRef([]);
  const images = useRef([]);

  let requestAnimationFrameId = null;
  let xForce = 0;
  let yForce = 0;
  const easing = 0.08;
  const speed = 0.01;

  const [currentTitle, setCurrentTitle] = useState("Talent spoter");
  const titles = ["Talent spoter", "Matchmaker", "Facilitator"];
  gsap.registerPlugin(ScrollTrigger);

  const manageMouseMove = (e) => {
    const { movementX, movementY } = e;
    xForce += movementX * speed;
    yForce += movementY * speed;

    if (requestAnimationFrameId == null) {
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
  };

  const lerp = (start, target, amount) => {
    return start * (1 - amount) + target * amount;
  };

  const animate = () => {
    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);
    if (images.current) {
      gsap.set('.spotter-image-1', {
        xPercent: `+=${xForce * 0.2}`,
        yPercent: `+=${yForce * 0.5}`,
      });
      gsap.set('.spotter-image-2, .facilitator-image-2', {
        xPercent: `+=${xForce * 0.15}`,
        yPercent: `+=${yForce * 0.15}`,
      });
      gsap.set('.matchmaker-image-1, .facilitator-image-1', {
        xPercent: `+=${xForce * 0.3}`,
        yPercent: `+=${yForce * 0.3}`,
      });
      gsap.set('.matchmaker-image-2', {
        xPercent: `+=${xForce * 0.05}`,
        yPercent: `+=${yForce * 0.05}`,
      });
      gsap.set(title.current, {
        xPercent: `+=${xForce * 0.01}`,
      });
    }

    if (Math.abs(xForce) < 0.01) xForce = 0;
    if (Math.abs(yForce) < 0.01) yForce = 0;

    if (xForce != 0 || yForce != 0) {
      requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestAnimationFrameId);
      requestAnimationFrameId = null;
    }
  };

  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: slider.current,
        start: "top center",
        end: "bottom bottom",
        pin: title.current,
        pinSpacing: false,
      },
    });

    section.current.forEach((currSec, index) => {
      ScrollTrigger.create({
        trigger: currSec,
        start: "top center",
        end: "top center",
        scrub: true,
        onEnter: () => setCurrentTitle(titles[index]),
        onLeaveBack: () =>
          setCurrentTitle(index !== 0 ? titles[index - 1] : titles[0]),
      });
    });
  });

  return (
    <section
      className="slider"
      ref={slider}
      onMouseMove={(e) => {
        manageMouseMove(e);
      }}
    >
      <div className="slider__title-wrapper" ref={title}>
        <span>{`(`}</span>
        <AnimatePresence mode="wait">
          <motion.h1
            variants={titleAnim}
            key={currentTitle}
            initial="initial"
            animate="animate"
            exit="exit"
            className="slider__title"
          >
            {currentTitle}
          </motion.h1>
        </AnimatePresence>
        <span>{`)`}</span>
      </div>
      <div
        className="section section-1"
        ref={(sec) => section.current.push(sec)}
      >
        <img
          src="/images/spoter-1.jpg"
          alt="spoter-1"
          className="spotter-image-1"
          ref={(sec) => images.current.push(sec)}
        />
        <img
          src="/images/spoter-2.jpg"
          alt="spoter-2"
          className="spotter-image-2"
          ref={(sec) => images.current.push(sec)}
        />
      </div>

      <div
        className="section section-2"
        ref={(sec) => section.current.push(sec)}
      >
        <img
          src="/images/matchmaker-1.jpg"
          alt="matchmaker-1"
          className="matchmaker-image-1"
          ref={(sec) => images.current.push(sec)}
        />
        <img
          src="/images/matchmaker-2.jpg"
          alt="matchmaker-2"
          className="matchmaker-image-2"
          ref={(sec) => images.current.push(sec)}
        />
      </div>

      <div
        className="section section-3"
        ref={(sec) => section.current.push(sec)}
      >
        <img
          src="/images/facilitator-1.jpg"
          alt="facilitator-1"
          className="facilitator-image-1"
          ref={(sec) => images.current.push(sec)}
        />
        <img
          src="/images/facilitator-2.jpg"
          alt="facilitator-2"
          className="facilitator-image-2"
          ref={(sec) => images.current.push(sec)}
        />
      </div>
    </section>
  );
};
