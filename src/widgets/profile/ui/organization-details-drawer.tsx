"use client";

import { IOrganization } from "@/entities/organization";
import { Drawer, IconButton } from "@/shared/ui";
import { Globe, MapPin, Phone, X } from "lucide-react";
import Image from "next/image";

interface IOrganizationDetailsDrawerProps {
  organization: IOrganization;
  isOpen: boolean;
  onClose: () => void;
}

export function OrganizationDetailsDrawer({
  // добавить редактирование
  organization,
  isOpen,
  onClose,
}: IOrganizationDetailsDrawerProps) {
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      anchor="right"
      drawerClassname="w-2/3"
      containerClassname="p-6"
      headerContent={(handleClose) => (
        <div className="flex gap-2 items-center pr-4 py-4 border-b border-neutral-200 dark:border-neutral-800">
          <IconButton icon={X} onClick={handleClose} iconClassName="w-5 h-5" />
          <h2 className="text-xl font-semibold">{organization.name}</h2>
        </div>
      )}>
      <div className="space-y-6">
        {organization.coverImage && (
          <Image
            src={organization.coverImage}
            alt={organization.name}
            width={500}
            height={200}
            className="w-full h-48 object-cover rounded-lg"
          />
        )}
        {organization.description && (
          <div>
            <h3 className="font-semibold text-lg mb-2">Описание</h3>
            <p className="text-gray-600 dark:text-gray-300">{organization.description}</p>
          </div>
        )}
        <div>
          <h3 className="font-semibold text-lg mb-3">Контакты</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span>{organization.address}</span>
            </div>
            {organization.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-500" />
                <a href={`tel:${organization.phone}`} className="hover:text-purple-600">
                  {organization.phone}
                </a>
              </div>
            )}
            {organization.website && (
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-gray-500" />
                <a
                  href={organization.website}
                  target="_blank"
                  rel="noopener noreferrer" //poka noreferrer
                  className="hover:text-purple-600">
                  {organization.website}
                </a>
              </div>
            )}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">Тип</h3>
          <span className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full">
            {organization.type}
          </span>
        </div>
        {organization.stories && organization.stories.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg mb-2">Сторисы</h3>
            <p className="text-gray-600 dark:text-gray-300">Всего: {organization.stories.length}</p>
          </div>
        )}
        <div className="flex gap-2 flex-wrap">
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              organization.isActive
                ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}>
            {organization.isActive ? "Активно" : "Неактивно"}
          </span>
        </div>
      </div>
    </Drawer>
  );
}
