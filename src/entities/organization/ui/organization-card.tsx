"use client";

import { cn } from "@/shared/lib";
import { getMediaUrl } from "@/shared/lib/utils";
import { Eye, MapPin } from "lucide-react";
import Image from "next/image";
import { organizationTypesLabels } from "../model/constants";
import { IOrganization } from "../model/types";
import { OrganizationLogo } from "./organization-logo";

interface IOrganizationCardProps {
  organization: IOrganization;
  onClick?: () => void;
  className?: string;
  withHoverEffect?: boolean;
}
export function OrganizationCard({
  organization,
  className,
  onClick,
  withHoverEffect = false,
}: IOrganizationCardProps) {
  const storiesCount = organization.stories?.length || 0;
  const totalViews = organization.stories?.reduce((sum, s) => sum + s.viewCount, 0) || 0;
  const typeInRu = organizationTypesLabels[organization.type] || organization.type;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg cursor-pointer",
        withHoverEffect && "group hover:shadow-2xl transition-all transform hover:-translate-y-1",
        className
      )}
      onClick={handleClick}>
      <div className="relative h-48 bg-gradient-to-br from-purple-400 to-pink-400 overflow-hidden">
        {organization.coverImage ? (
          <Image
            src={getMediaUrl(organization.coverImage)}
            alt={organization.name}
            fill
            sizes="100%"
            className="object-cover transition-transform group-hover:scale-110"
          />
        ) : null}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
        {organization.logo && (
          <OrganizationLogo
            logoUrl={organization.logo}
            name={organization.name}
            className="absolute bottom-4 left-4"
          />
        )}
        {storiesCount > 0 && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            {storiesCount} сторис
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 overflow-hidden text-ellipsis whitespace-nowrap mb-2 group-hover:text-purple-600 transition-colors">
          {organization.name}
        </h3>
        {organization.address && (
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-3">
            <MapPin className="w-4 h-4" />
            <p className="text-sm">{organization.address}</p>
          </div>
        )}
        {organization.description && (
          <p className="text-gray-600 flex-grow text-sm line-clamp-2 overflow-hidden text-ellipsis mb-4">
            {organization.description}
          </p>
        )}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <p>{totalViews} просмотров</p>
          </div>
          <p className="px-3 py-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
            {typeInRu}
          </p>
        </div>
      </div>
    </div>
  );
}
