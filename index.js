exports.search = function (names, term) {
  const index = { };
  const registers = { };

  names.forEach(function(name, id) {
    registers[id] = name;
    const parts = name.split(' ');

    parts.forEach(function(part) {
      index[part] = index[part] || [];
      index[part].push(id);
    });
  });

  const result = { };

  const terms = term.split(' ');
  const founds = terms.reduce(function(res, value) {
    return res.concat(index[value]);
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
