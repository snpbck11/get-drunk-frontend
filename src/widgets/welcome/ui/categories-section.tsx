import { categories, CategoryCard } from "@/entities/category";
import { Section } from "@/shared/ui";
import { SectionTitle } from "./section-title";

export function CategoriesSection() {
  return (
    <Section>
      <SectionTitle title="Популярные категории" subtitle="Найди то, что ищешь" />
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <CategoryCard key={category.type} category={category} />
        ))}
      </div>
    </Section>
  );
}
