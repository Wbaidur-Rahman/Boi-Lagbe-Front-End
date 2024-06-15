import CategoryLink from "./CategoryLink";

export default function Category() {
  const categories = ["academic", "poem", "novel", "gk", "others"];
  return (
    <div>
      {categories.map((category) => (
        <CategoryLink key={category} category={category} />
      ))}
    </div>
  );
}
