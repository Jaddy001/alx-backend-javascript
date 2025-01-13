// 100-weak.js
export const weakMap = new WeakMap();

export function queryAPI(endpoint) {
  // Check if the endpoint exists in the weakMap
  if (!weakMap.has(endpoint)) {
    weakMap.set(endpoint, 0);
  }
  
  // Get the current count of calls for the endpoint
  const count = weakMap.get(endpoint);

  // Increment the count
  weakMap.set(endpoint, count + 1);

  // If the count is >= 5, throw an error
  if (count + 1 >= 5) {
    throw new Error('Endpoint load is high');
  }
}

