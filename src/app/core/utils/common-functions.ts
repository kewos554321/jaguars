export function isNullOrEmpty(value: any): boolean {
  // 檢查值是否為 undefined 或 null
  if(value === undefined || value === null) {
    return true;
  }

  // 檢查值是否為空字串
  if(typeof value === 'string' && value.trim() === '') {
    return true;
  }

  // 檢查值是否為空陣列
  if(Array.isArray(value) && value.length === 0) {
    console.log('the value is a empty array...');
    return true;
  }

  // 檢查值是否為空物件（沒有任何屬性）
  if(typeof value === 'object' && Object.keys(value).length === 0) {
    console.log('the value is a empty object...');
    return true;
  }
  return false;
}

export function isJSON(value: string): boolean {
  try {
    JSON.parse(value);
  } catch {
    return false;
  }
  return true;
}
