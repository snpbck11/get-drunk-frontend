import { OrganizationLogo } from "@/entities/organization";
import { cn } from "@/shared/lib";

interface IStoryDescriptionProps {
  logoUrl?: string;
  name: string;
  caption?: string;
  containerClassName?: string;
}

export function StoryDescription({
  logoUrl,
  name,
  caption,
  containerClassName,
}: IStoryDescriptionProps) {
  return (
    <div className={cn("flex flex-col self-end px-4 pb-4 w-full", containerClassName)}>
      <div className="flex items-center gap-3">
        {logoUrl && <OrganizationLogo logoUrl={logoUrl} name={name} size="sm" />}
        <p className="font-semibold">{name}</p>
      </div>
      <p className="text-center md:text-left text-lg px-4 py-2">{caption}</p>
    </div>
  );
}
