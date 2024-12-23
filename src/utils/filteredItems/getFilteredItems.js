// items — загальний список елементів (наприклад, всі профілі).
// excludedItems — список елементів, які потрібно виключити (наприклад, підписки).
// limit — кількість елементів, які потрібно повернути.

export function getFilteredItems(items, excludedItems, limit) {
  // Фільтруємо елементи, яких немає в excludedItems
  const filteredItems = items.filter(
    (item) => !excludedItems.some((excluded) => excluded.id === item.id)
  );

  // Повертаємо максимум limit елементів
  return filteredItems.slice(0, Math.min(limit, filteredItems.length));
}
