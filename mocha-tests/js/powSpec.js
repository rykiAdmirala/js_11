var assert = chai.assert;
var expect = chai.expect;


describe("pow", function() {


  it("движок не троит", function() {
  	expect(pow).to.not.throw(Error);
  });

  it("результат функции - число", function() {
    assert.isNotNaN(pow(42, -42));
  });

  it("возводит натуральное число в натуральную степень", function() {
    assert.equal(pow(4, 4), 256);
  });

  it("возводит отрицательное число в отрицательную степень", function() {
  	expect(pow(-10,-2)).to.equal(0.01);
  });

  it("с нулем тоже всё в порядке", function() {
    assert.equal(pow(2, 0), 1);
    assert.equal(pow(0, 5), 0);
  });




});