const commonMethodsMock = {
  create: jest.fn(),
  update: jest.fn(),
  findMany: jest.fn(),
  findFirst: jest.fn(),
};
export const createPrismaClientMock = () => ({
  game: commonMethodsMock,
  gamePlayer: commonMethodsMock,
  gameMove: commonMethodsMock,
});
