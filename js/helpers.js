// Utility to format date
function formatDate(timeStamp) {
  const date = new Date(timeStamp);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

// Capitalizing spaces
export function capitalize(input) {
  const trimmed = input.trim();
  if (trimmed.includes(' ')) {
    const mulWords = trimmed.split(' ').map(word => {
      return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
    });
    return mulWords.join(' ');
  } else return `${trimmed.slice(0, 1).toUpperCase()}${trimmed.slice(1)}`;
}

// Capitalizing Task
export function capitalizeTask(input) {
  const trimmed = input.trim();
  return `${trimmed.slice(0, 1).toUpperCase()}${trimmed.slice(1)}`;
}

// Calculate days passed
export function calcDays(date) {
  const days = Math.floor(Math.abs(Date.now() - date) / (1000 * 60 * 60 * 24));
  if (days === 1) return 'YESTERDAY';
  if (days === 0) return 'TODAY';
  if (days > 1 && days <= 30) return `${days} DAYS AGO`;
  if (days > 30) return formatDate(date);
}
