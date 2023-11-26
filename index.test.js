const init = require('./index');
const Triangle = require('./index').Triangle;
const Circle = require('./index').Circle;
const Square = require('./index').Square;
const responses = {
  color: "blue",
};



describe('Triangle', () => {
  it('should return true if triangle is rendered correctly', () => {
      const responses = { color: "blue" };
      const shape = new Triangle(responses);
      expect(shape.render()).toEqual(`'<polygon points='150, 18 244, 182 56, 182' fill='blue' />'`);
  });
});

describe('Circle', () => {
  it('should return true if circle is rendered correctly', () => {
      const responses = { color: "blue" };
      const shape = new Circle(responses);
      expect(shape.render()).toEqual(`<circle cx="50" cy="50" r="40" fill="blue" />`);
  });
});

describe('Square', () => {
  it('should return true if square is rendered correctly', () => {
      const responses = { color: "blue" };
      const shape = new Square(responses);
      expect(shape.render()).toEqual(`<rect x="0" y="0" width="100" height="100" fill="blue" />`);
  });
});


