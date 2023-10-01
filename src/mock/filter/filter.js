const filterNames = ['all', 'overdue', 'today', 'favorites', 'repeating', 'archive'];

export const generateFilters = () => {
  return filterNames.map((title) => ({ title, count: Math.round(Math.random() * 10) }));
};
