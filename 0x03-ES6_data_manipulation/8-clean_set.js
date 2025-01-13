// 8-clean_set.js
export default function cleanSet(set, startString) {
  let result = [];
  set.forEach(value => {
    if (value.startsWith(startString)) {
      result.push(value.slice(startString.length));
    }
  });
  return result.join('-');
}

