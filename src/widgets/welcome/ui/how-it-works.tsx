import { Button, Section } from "@/shared/ui";
import { Bell, Heart, LucideIcon, PlayCircle, Search } from "lucide-react";
import { SectionTitle } from "./section-title";

interface IStep {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const steps: IStep[] = [
  {
    icon: Search,
    title: "Найди заведение",
    description: "Ищи любимые места или открывай новые в своем городе",
    color: "bg-blue-500",
  },
  {
    icon: PlayCircle,
    title: "Смотри сторис",
    description: "Узнавай о новых блюдах, событиях и специальных предложениях",
    color: "bg-purple-500",
  },
  {
    icon: Heart,
    title: "Добавь в избранное",
    description: "Сохраняй понравившиеся места и получай уведомления",
    color: "bg-pink-500",
  },
  {
    icon: Bell,
    title: "Будь в курсе",
    description: "Не пропускай важные события и акции от любимых заведений",
    color: "bg-orange-500",
  },
];

interface IStepCardProps {
  step: IStep;
  index: number;
}

function StepCard({ step, index }: IStepCardProps) {
  const Icon = step.icon;

  return (
    <div className="relative flex flex-col group">
      <div
        className="absolute -top-4 -left-4 w-10 h-10 bg-gray-900 dark:bg-gray-300 rounded-full flex items-center justify-center font-bold text-xl dark:text-gray-900 shadow-lg z-10 
                transition-transform group-hover:scale-110">
        {index + 1}
      </div>
      <div className="bg-gray-50 dark:bg-gray-600 rounded-2xl p-8 pt-12 hover:shadow-xl transition-all transform hover:-translate-y-1 flex-grow">
        <div
          className={`${step.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-3 text-center">
          {step.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-center">{step.description}</p>
      </div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <Section>
      <SectionTitle
        title="Как это работает"
        subtitle="Открой для себя новые места в несколько шагов"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <StepCard key={index + step.title} step={step} index={index} />
        ))}
      </div>
      <div className="mt-16 text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white">
        <h3 className="text-3xl font-bold mb-4">Готов начать?</h3>
        <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
          Присоединяйся к тысячам пользователей, которые уже открывают свой город по-новому
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/" variant="ghost" size="lg">
            Скачать приложение (нет приложения)
          </Button>
          <Button href="/organizations" size="lg">
            Для бизнеса
          </Button>
        </div>
      </div>
    </Section>
  );
}
