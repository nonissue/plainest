const size = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop: 2560,
};

const device = Object.keys(size).reduce((acc, cur) => {
  acc[cur] = `(min-width: ${size[cur]}px)`;
  return acc;
}, {});

export default device;
