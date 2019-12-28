const closeSpring = { type: 'spring', stiffness: 300, damping: 200 };

const transition = {
  duration: 0.5,
  ease: [0.43, 0.13, 0.23, 0.96],
};

export const gridVariants = {
  open: {
    y: 0,
    transition: {
      ...closeSpring,
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
  closed: { y: 0 },
};

export const itemVariants = {
  open: {
    scale: 1,
    opacity: 1,
    transition,
  },
  closed: { scale: 1, opacity: 0 },
};
