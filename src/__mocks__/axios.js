export default {
  get: jest.fn(() => Promise.resolve({ data: {} })),
  default: jest.fn(() => Promise.resolve({ data: 'data' })),
};
