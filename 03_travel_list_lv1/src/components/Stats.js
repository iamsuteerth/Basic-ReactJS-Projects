export default function Stats({ items }) {
  // If items is empty
  if (!items.length) {
    return (
      <p className="stats">
        <em>Start adding some items to your packing list!</em>
      </p>
    );
  }
  // If items is NOT empty
  const numItems = items.length;
  const packedItems = items.filter((item) => item.packed === true).length;
  const percentage = Math.round((packedItems / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go ✈️"
          : `💼 You have ${numItems} items in your list, and you have already packed ${packedItems} (${percentage}%)`}
      </em>
    </footer>
  );
}
