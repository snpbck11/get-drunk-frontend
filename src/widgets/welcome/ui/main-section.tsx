import { Section } from "@/shared/ui";
import { Button } from "@/shared/ui/button";
import { Beer, Coffee, Wine } from "lucide-react";

const stats = [
  { value: "500+", label: "Заведений" },
  { value: "10K+", label: "Сторис" },
  { value: "50K+", label: "Пользователей" },
  { value: "100+", label: "Городов" },
];

export function MainSection() {
  return (
    <Section className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white py-20 px-4">
      <div className="text-center space-y-6">
        <div className="flex justify-center gap-4 mb-6">
          <Wine className="w-12 h-12 animate-bounce" style={{ animationDelay: "0s" }} />
          <Beer className="w-12 h-12 animate-bounce" style={{ animationDelay: "0.1s" }} />
          <Coffee className="w-12 h-12 animate-bounce" style={{ animationDelay: "0.2s" }} />
        </div>
        <h1 className="max-w-1xl text-5xl md:text-7xl font-bold leading-tight">
          Открой свой город
          <span className="block text-yellow-300">по-новому</span>
        </h1>
        <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto">
          Не знаешь куда пойти прямо сейчас? Смотри актуальные сторис от заведений рядом с тобой.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button href="/stories">Смотреть сторис</Button>
          <Button href="/organizations" variant="ghost">
            Все заведения
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
        {stats.map(({ value, label }) => (
          <div key={value + label} className="text-center">
            <div className="text-4xl font-bold text-yellow-300">{value}</div>
            <div className="text-purple-200 mt-1">{label}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
