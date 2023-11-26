const init = require('./index');

describe('init', () => {
  

  describe('Triangle Test', () => {
    it('should return true if triangle is rendered correctly', () => {
        const shape = new Triangle();
        shape.setColor("blue");
        expect(shape.render()).toEqual('<polygon points="150, 18 244, 182 56, 182" fill="blue" />');
    });
  });
});



