var removeDiacritics = require('diacritics').remove;

exports.search = function (names, term) {
  const index = { };
  const registers = { };

  names.forEach(function(name, id) {
    registers[id] = name;
    const parts = name.split(' ');

    parts.forEach(function(part) {
      const sanitized = removeDiacritics(part.toLowerCase());
      index[sanitized] = index[sanitized] || [];
      index[sanitized].push(id);
    });
  });

  const result = { };

  const terms = term.split(' ');
  const founds = terms.reduce(function(res, value) {
    const sanitized = removeDiacritics(value.toLowerCase());
    return res.concat(index[sanitized] || []);
  }, []);

  const grouped = founds.reduce(function(res, id) {
    res[id] = res[id] || 0;
    res[id]++;
    return res;
  }, { });

  const sorted = Object.keys(grouped)
    .sort(function(id1, id2) {
      return grouped[id1] < grouped[id2];
    });

  return sorted.map(function(id) {
    return registers[id];
  });
}
