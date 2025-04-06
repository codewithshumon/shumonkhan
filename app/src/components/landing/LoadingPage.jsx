"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoadingPage() {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setAnimationStarted(true);
    }, 1000); // Start animation after 1 second

    const completeTimer = setTimeout(() => {
      setAnimationComplete(true);
    }, 4000); // Mark animation complete after 4 seconds (1s delay + 3s animation)

    return () => {
      clearTimeout(startTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-red-500">
      {/* Combined Animation/Header Element */}
      <motion.div
        layout
        initial={{
          position: "fixed",
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          width: "12rem",
          height: "12rem",
          zIndex: 50,
          borderRadius: "9999px",
        }}
        animate={
          animationStarted
            ? animationComplete
              ? {
                  // Final header state
                  top: 0,
                  left: 0,
                  x: 0,
                  y: 0,
                  width: "100%",
                  height: "5rem",
                  borderRadius: "0px",
                }
              : {
                  // Moving to corner state
                  top: "1rem",
                  left: "1rem",
                  x: 0,
                  y: 0,
                  width: "4rem",
                  height: "4rem",
                  borderRadius: "9999px",
                }
            : {}
        }
        transition={{
          duration: animationComplete ? 2 : 3,
          ease: animationComplete ? "easeInOut" : "linear",
        }}
        className="bg-black/80 backdrop-blur-sm overflow-hidden relative"
      >
        {/* Profile Image - becomes logo */}
        <motion.div
          layout
          className={`absolute ${
            animationComplete ? "left-4" : "left-1/2 -translate-x-1/2"
          } top-1/2 -translate-y-1/2 w-16 h-16 rounded-full overflow-hidden border-2 border-white`}
          transition={{ duration: animationComplete ? 2 : 3 }}
        >
          <Image
            src="https://avatar.iran.liara.run/public/boy"
            alt="Profile"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Hello Text - fades out */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold"
          initial={{ opacity: 1 }}
          animate={{
            opacity: animationStarted ? 0 : 1,
            fontSize: animationStarted ? "0rem" : "2.25rem",
          }}
          transition={{ duration: 1, delay: animationStarted ? 1 : 0 }}
        >
          Hello
        </motion.div>

        {/* Navigation - appears after collapse */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: animationComplete ? 1 : 0 }}
          transition={{ delay: animationComplete ? 1.5 : 0 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex space-x-8"
        >
          <Link href="/" className="text-white hover:text-gray-300 transition">
            Home
          </Link>
          <Link
            href="/about"
            className="text-white hover:text-gray-300 transition"
          >
            About
          </Link>
          <Link
            href="/projects"
            className="text-white hover:text-gray-300 transition"
          >
            Projects
          </Link>
          <Link
            href="/contact"
            className="text-white hover:text-gray-300 transition"
          >
            Contact
          </Link>
        </motion.nav>
      </motion.div>
    </div>
  );
}

// "use client";

// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";

// export default function LoadingPage() {
//   const [animationStarted, setAnimationStarted] = useState(false);
//   const [animationComplete, setAnimationComplete] = useState(false);

//   useEffect(() => {
//     const startTimer = setTimeout(() => {
//       setAnimationStarted(true);
//     }, 1000); // Start animation after 1 second

//     const completeTimer = setTimeout(() => {
//       setAnimationComplete(true);
//     }, 4000); // Mark animation complete after 4 seconds (1s delay + 3s animation)

//     return () => {
//       clearTimeout(startTimer);
//       clearTimeout(completeTimer);
//     };
//   }, []);

//   return (
//     <div className="min-h-screen bg-black">
//       {/* Loading Animation */}
//       <motion.div
//         layout
//         initial={{
//           position: "fixed",
//           top: "50%",
//           left: "50%",
//           x: "-50%",
//           y: "-50%",
//           width: "12rem",
//           height: "12rem",
//           zIndex: 50,
//         }}
//         animate={
//           animationStarted
//             ? {
//                 top: "1rem",
//                 left: "1rem",
//                 x: 0,
//                 y: 0,
//                 width: "4rem",
//                 height: "4rem",
//               }
//             : {}
//         }
//         transition={{ duration: 3 }}
//         className="rounded-full border-4 border-white overflow-hidden relative"
//         style={{
//           borderWidth: animationStarted ? "2px" : "4px",
//         }}
//       >
//         <Image
//           src="https://avatar.iran.liara.run/public/boy"
//           alt="Profile"
//           fill
//           className="object-cover"
//         />

//         <motion.div
//           className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold"
//           initial={{ opacity: 1 }}
//           animate={{
//             opacity: animationStarted ? 0 : 1,
//             fontSize: animationStarted ? "0rem" : "2.25rem",
//           }}
//           transition={{ duration: 1, delay: animationStarted ? 1 : 0 }}
//         >
//           Hello
//         </motion.div>
//       </motion.div>

//       {/* Header that appears after animation */}
//       <motion.header
//         initial={{ opacity: 0, y: -20 }}
//         animate={animationComplete ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.5 }}
//         className={`fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-40 ${
//           !animationComplete ? "pointer-events-none" : ""
//         }`}
//       >
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <div className="w-16"></div> {/* Spacer to balance logo */}
//           <nav className="flex space-x-8">
//             <Link
//               href="/"
//               className="text-white hover:text-gray-300 transition"
//             >
//               Home
//             </Link>
//             <Link
//               href="/about"
//               className="text-white hover:text-gray-300 transition"
//             >
//               About
//             </Link>
//             <Link
//               href="/projects"
//               className="text-white hover:text-gray-300 transition"
//             >
//               Projects
//             </Link>
//             <Link
//               href="/contact"
//               className="text-white hover:text-gray-300 transition"
//             >
//               Contact
//             </Link>
//           </nav>
//           <div className="w-16"></div> {/* Spacer to balance logo */}
//         </div>
//       </motion.header>
//     </div>
//   );
// }
