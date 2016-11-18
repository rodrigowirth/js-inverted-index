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

  return index[term].map(function(id) {
    return registers[id];
  });
}
