function groupByEntries<T extends Record<string, any>>(array: T[], key: keyof T): [string, T[]][] {
  const grouped = array.reduce(
    (result, item) => {
      const groupKey = String(item[key]);
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    },
    {} as Record<string, T[]>,
  );

  return Object.entries(grouped);
}

export { groupByEntries };
