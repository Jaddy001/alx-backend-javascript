// 7-has_array_values.js
export default function hasValuesFromArray(set, array) {
  return array.every(item => set.has(item));
}

