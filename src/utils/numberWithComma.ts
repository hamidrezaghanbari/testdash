export function numberWithCommas(x: string | number, supportNegative = false): string | number {
  if (x) {
    let str = persianNumberToEnglish(x).toString();
    let negative = false;
    if (supportNegative && str.startsWith('-')) {
      str = str.substring(1);
      negative = true;
    }
    str = str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (negative) {
      str = `-${str}`;
    }
    return str;
  }
  return x;
}

export function persianNumberToEnglish(x: string | number): string | number {
  if (x) {
    const str = x.toString();
    let res = '';
    for (let i = 0; i < str.length; i++) {
      const char = str[i] as keyof typeof persianToEnglishMap;
      if (persianToEnglishMap[char]) {
        res += persianToEnglishMap[char];
      } else {
        res += str[i];
      }
    }
    return res;
  }
  return x;
}

const persianToEnglishMap = {
  '۰': '0',
  '۱': '1',
  '۲': '2',
  '۳': '3',
  '۴': '4',
  '۵': '5',
  '۶': '6',
  '۷': '7',
  '۸': '8',
  '۹': '9',
} as const;
