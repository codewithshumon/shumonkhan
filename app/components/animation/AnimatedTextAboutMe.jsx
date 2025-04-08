import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import useScrollY from "../../hooks/useScroll";

const AnimatedTextAboutMe = ({ animationComplete }) => {
  const animationText =
    "© Code & Design By Shumon Khan • Hi, I am a Designer and Developer";

  const scrollY = useScrollY();
  const scrollRef = useRef(scrollY);
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

  useEffect(() => {
    scrollRef.current = scrollY;
  }, [scrollY]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ScrollTrigger for direction control
      ScrollTrigger.create({
        trigger: slider.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          direction = self.direction * -1; // Reverse scroll direction
        },
      });

      // Animation loop
      const animate = () => {
        xPercent += 0.1 * direction;

        // Wrap around logic
        if (xPercent <= -100) {
          xPercent = 0;
        } else if (xPercent >= 0) {
          xPercent = -100;
        }

        gsap.set([firstText.current, secondText.current], {
          xPercent: xPercent,
        });

        requestAnimationFrame(animate);
      };

      animate();
    }, slider);

    return () => {
      ctx.revert(); // Cleanup GSAP context
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <motion.div
      initial={{ left: "-100%" }}
      animate={{ left: animationComplete ? "0" : "-100%" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="relative"
    >
      <div
        ref={slider}
        className="w-full h-full text-[15px] font-medium select-none overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 20%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 20%, black 90%, transparent 100%)",
        }}
      >
        <div className="relative whitespace-nowrap w-fit flex">
          <div ref={firstText} className="pr-4">
            <h1 className="text-[#0a0801]">{animationText}</h1>
          </div>
          <div ref={secondText} className="absolute left-full pr-4">
            <h1 className="text-[#0a0801]">{animationText}</h1>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedTextAboutMe;
