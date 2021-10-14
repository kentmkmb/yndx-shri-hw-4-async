module.exports = ({
  AsyncArray,
  add,
  subtract,
  multiply,
  divide,
  less,
  equal,
  lessOrEqual,
}) => {
  return (asyncArray, fn, initialValue, cb) => {
    const _call = (fn) => {
      return async (...args) => new Promise((resolve) => fn(...args, resolve));
    };

    const run = async () => {
      const length = await _call(asyncArray.length)();
      let acc = initialValue;
      for (
        let i = 0;
        await _call(less)(i, length);
        i = await _call(add)(i, 1)
      ) {
        const current = await _call(asyncArray.get)(i);
        acc = await _call(fn)(acc, current, i, asyncArray);
      }
      cb(acc);
    };

    run();
  };
};
