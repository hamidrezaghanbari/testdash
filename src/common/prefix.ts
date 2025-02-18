function prefix(text: string | number | undefined, prefix: string, delimiter = '-') {
  if (typeof text === 'undefined') return '';

  return [prefix, delimiter, text].join('');
}

export { prefix };
