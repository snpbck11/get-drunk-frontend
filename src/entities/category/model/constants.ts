import { BottleWine, Coffee, MicVocal, MoreHorizontal, UtensilsCrossed, Wine } from "lucide-react";
import { ICategory } from "./types";

export const categories: ICategory[] = [
  {
    name: "Рестораны",
    type: "restaurant",
    icon: UtensilsCrossed,
    color: "bg-orange-500",
    count: 150,
  },
  {
    name: "Кафе",
    type: "cafe",
    icon: Coffee,
    color: "bg-amber-600",
    count: 120,
  },
  {
    name: "Бары",
    type: "bar",
    icon: Wine,
    color: "bg-purple-600",
    count: 80,
  },
  {
    name: "Клубы",
    type: "club",
    icon: BottleWine,
    color: "bg-pink-500",
    count: 90,
  },
  {
    name: "Караоке",
    type: "karaoke",
    icon: MicVocal,
    color: "bg-blue-500",
    count: 90,
  },
  {
    name: "Другое",
    type: "other",
    icon: MoreHorizontal,
    color: "bg-gray-600",
    count: 20,
  },
];
