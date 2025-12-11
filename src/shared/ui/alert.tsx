import { AlertCircle } from "lucide-react";

interface IAlert {
  message: string;
}

export function Alert({ message }: IAlert) {
  return (
    <div className="flex gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
      <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-amber-800 dark:text-amber-200">{message}</p>
    </div>
  );
}
