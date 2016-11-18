const expect = require('chai').expect;
const fs = require('fs');

const search = require('./index').search;

const BASE_PATH = './spec-cases';

describe('js inverted index', function () {
  describe('case 000', function () {
    const input = readInput('000');

    it('should return 4 result for tem "wirth"', function () {
      expect(search(input, 'wirth')).to.have.length(4);
    });
  });
});

function readInput (caseNumber) {
  let input = fs.readFileSync(`spec-cases/input${caseNumber}.txt`).toString();
  input = input.split(/\r?\n/)
  input.pop();

  return input;
}
