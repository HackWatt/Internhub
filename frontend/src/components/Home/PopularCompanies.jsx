import React, { useEffect } from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Canada",
      openPositions: 10,
      icon: <FaMicrosoft size={24} />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Canada",
      openPositions: 5,
      icon: <SiTesla size={24} />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Canada",
      openPositions: 20,
      icon: <FaApple size={24} />,
    },
  ];

  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        yoyo: Infinity
      }
    }
  };

  return (
    <div className="companies" ref={ref}>
      <div className="container">
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={controls}
          transition={{ duration: 0.5 }}
        >
          TOP COMPANIES
        </motion.h3>
        <motion.div
          className="banner"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {companies.map((element) => (
            <motion.div
              className="card"
              key={element.id}
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <div className="content">
                <motion.div 
                  className="icon"
                  whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
                >
                  {element.icon}
                </motion.div>
                <div className="text">
                  <p className="company-name">{element.title}</p>
                  <p className="company-location">{element.location}</p>
                </div>
              </div>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                Open Positions {element.openPositions}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PopularCompanies;