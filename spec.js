const expect = require('chai').expect;
const fs = require('fs');

const search = require('./index').search;

const BASE_PATH = './spec-cases';

describe('js inverted index', function () {
  describe('case 000', function () {
    const input = readInput('000');

    it('should return 4 results for term "Wirth"', function () {
      expect(search(input, 'Wirth')).to.have.length(4);
    });

    it('should return 1 result for term "Rodrigo"', function () {
      expect(search(input, 'Rodrigo')).to.have.length(1);
    });

    it('should return 4 sorted results for term "Rodrigo Wirth"', function () {
      const result = search(input, 'Rodrigo Wirth');
      expect(result).to.have.length(4);
      expect(result[0]).to.be.equal('Rodrigo Wirth');
    });

    it('should return 4 sorted results for term "Luís Irineu Wirth"', function () {
      const result = search(input, 'Luís Irineu Wirth');
      expect(result).to.have.length(4);
      expect(result[0]).to.be.equal('Luís Irineu Wirth');
      expect(result[1]).to.be.equal('Irineu Wirth');
    });

    it('should return 4 results for term "Someone Wirth"', function () {
      const result = search(input, 'Someone Wirth');
      expect(result).to.have.length(4);
    });
  });
});

function readInput (caseNumber) {
  let input = fs.readFileSync(`spec-cases/input${caseNumber}.txt`).toString();
  input = input.split(/\r?\n/)
  input.pop();

  return input;
}
