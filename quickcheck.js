(function(exports) {
  function arbBool() {
    return Math.random() > 0.5 ? true : false;
  }

  exports.arbBool = arbBool;

  function arbDouble() {
    var sign = Math.random() > 0.5 ? 1 : -1;
    return sign * Math.random() * Number.MAX_VALUE;
  }

  exports.arbDouble = arbDouble;

  function arbInt() {
    var sign = Math.random() > 0.5 ? 1 : -1;
    return sign * Math.floor(Math.random() * Number.MAX_VALUE);
  }

  exports.arbInt = arbInt;

  function arbByte() {
    return Math.floor(Math.random() * 256);
  }

  exports.arbByte = arbByte;

  function arbChar() {
    return String.fromCharCode(arbByte());
  }

  exports.arbChar = arbChar;

  function arbArray(generator) {
    var
      len = Math.floor(Math.random() * 100),
      array = [],
      i;

    for (i = 0; i < len; i++) {
      array.push(generator());
    }

    return array;
  }

  exports.arbArray = arbArray;

  function arbString() {
    return arbArray(arbChar).join("");
  }

  exports.arbString = arbString;

  function forAll(generators, properties) {
    var
      fn = function (f) { return f(); },
      i,
      j,
      propertyLength,
      property,
      values;

    for (i = 0; i < 100; i ++) {
      values = generators.map(fn);

      for (j = 0, propertyLength = properties.length; j < propertyLength; j++) {
        property = properties[j];
        if (!property.apply(null, values)) {
          return { status: 'failed', property: property, values: values };
        }
      }
    }

    return { status: 'passed', values: values };
  }

  exports.forAll = forAll;

  return exports;
})(window.qc = {});
