import Link from "next/link";
import { ICategory } from "../model/types";

interface ICategoryCardProps {
  category: ICategory;
}

export function CategoryCard({ category }: ICategoryCardProps) {
  const Icon = category.icon;

  return (
    <Link
      href={`organizations?type=${category.type}`}
      className="group relative bg-gray-50 dark:bg-gray-600 dark:hover:bg-gray-800 hover:bg-gray-100 rounded-2xl p-6 transition-all transform hover:scale-105 hover:shadow-xl">
      <div className="flex flex-col items-center text-center space-y-3">
        <div
          className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-lg">{category.name}</h3>
          <p className="text-sm text-gray-500">{category.count} мест</p>
        </div>
      </div>
    </Link>
  );
}
