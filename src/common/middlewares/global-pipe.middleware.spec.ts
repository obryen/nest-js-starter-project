import { GlobalPipeMiddleware } from './global-pipe.middleware';

describe('GlobalPipeMiddleware', () => {
  it('should be defined', () => {
    expect(new GlobalPipeMiddleware()).toBeDefined();
  });
});
