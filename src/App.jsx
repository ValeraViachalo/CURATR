import ReactLenis, { useLenis } from "@studio-freight/react-lenis";
import { useEffect, useState } from "react";
import "./App.scss";
import { Hero } from "./hero/hero";
import { Slider } from "./Slider/Slider";
import { Footer } from "./Footer/Footer";
import  Pintext  from "./PinText/Pintext";

function easeInOutExpo(x) {
  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
    : (2 - Math.pow(2, -20 * x + 10)) / 2;
  }
function App() {
  return (
    <ReactLenis root options={{ easing: (x) => easeInOutExpo(x)}}>
      <Hero />
      <Slider />
      <Footer />
    </ReactLenis>
  );
}

export default App;
