export const createPrismaClientMock = () => ({
  room: {
    create: jest.fn(),
  },
});
