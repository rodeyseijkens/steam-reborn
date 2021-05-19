export const collapse = {
  transition: { duration: 0.3 },
  variants: {
    open: { opacity: 1, height: 'auto' },
    collapsed: { opacity: 0, height: 0 },
  },
  initial: 'collapsed',
  animate: 'open',
  exit: 'collapsed',
};

export const collapseChevron = {
  transition: { duration: 0.3 },
  variants: {
    open: { rotate: 0 },
    collapsed: { rotate: -90 },
  },
};
