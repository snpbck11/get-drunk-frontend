import api from "@/shared/api/api-base";
import { StoryViewer } from "@/widgets/story";



export default async function StoriesPage() {
  const result = await api.get("/organizations/stories"); // вынести в редакс/фичу

  if (!result) {
    return (
      <div className="h-full flex items-center justify-center bg-black text-white">
        <p className="text-xl">Не удалось загрузить сторисы</p>
      </div>
    );
  }

  const orgsWithStories = result.data;

  if (orgsWithStories.length === 0) {
    return (
      <div className="h-full flex items-center justify-cente text-white">
        <p className="text-xl">Нет доступных сторис</p>
      </div>
    );
  }

  return <StoryViewer organizations={orgsWithStories} />;
}
