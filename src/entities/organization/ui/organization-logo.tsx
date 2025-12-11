import { cn } from "@/shared/lib";
import { getMediaUrl } from "@/shared/lib/utils";
import Image from "next/image";

interface IOrganizationLogoProps {
  logoUrl?: string;
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function OrganizationLogo({
  logoUrl,
  name,
  size = "md",
  className,
}: IOrganizationLogoProps) {
  const sizeClasses: Record<string, string> = {
    xs: "w-8 h-8 border-2",
    sm: "w-12 h-12 border-2",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
  };

  const classes = cn(
    "rounded-full border-4 border-black dark:border-white overflow-hidden relative",
    sizeClasses[size],
    className
  );

  return (
    <div className={classes}>
      <Image src={getMediaUrl(logoUrl)} alt={name} fill className="object-cover" sizes="100%" />
    </div>
  );
}
