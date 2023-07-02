import sum from '.';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    let res = sum(17, 6);
    expect(res).toBe(23);
    res = sum(5, -9);
    expect(res).toBe(-4);
    res = sum(8, 93);
    expect(res).toBe(101);
  });
});