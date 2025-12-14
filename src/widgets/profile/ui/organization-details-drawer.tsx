"use client";

import {
  IOrganization,
  OrganizationLogo,
  organizationTypesLabels,
  TOrganizationTypes,
} from "@/entities/organization";
import { Carousel, Drawer, IconButton } from "@/shared/ui";
import { ChevronLeft, Globe, LucideIcon, MapPin, Phone } from "lucide-react";
import Image from "next/image";

interface IOrganizationDetailsDrawerProps {
  organization: IOrganization;
  isOpen: boolean;
  onClose: () => void;
}

const DetailsTitle = ({ title }: { title: string }) => (
  <h3 className="font-semibold text-lg mb-2">{title}</h3>
);

const DetailsDescription = ({ description }: { description: string }) => (
  <p className="text-gray-600 dark:text-gray-300">{description}</p>
);

const DetailsContactItem = ({
  icon: Icon,
  link,
  ...linkProps
}: {
  icon: LucideIcon;
  link: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <div className="flex items-center gap-3">
    <Icon className="w-5 h-5 text-gray-500" />
    <a href={link} className="hover:text-purple-600" {...linkProps}>
      {link}
    </a>
  </div>
);

const DetailsTypeItem = ({ type }: { type: TOrganizationTypes }) => (
  // mojet razdelit tipi s raznimi cvetami hz
  <p className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full">
    {organizationTypesLabels[type]}
  </p>
);

const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

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
      drawerClassname="w-full sm:w-10/11 md:w-2/3"
      containerClassname="p-6"
      headerContent={(handleClose) => (
        <div className="flex gap-2 items-center pr-4 py-4 border-b border-neutral-200 dark:border-neutral-800">
          <IconButton icon={ChevronLeft} onClick={handleClose} iconClassName="w-5 h-5" />
          <div className="flex flex-col  flex-grow">
            <h2 className="text-xl font-semibold">{organization.name}</h2>
            <div className="relative">
              {organization.coverImage && (
                <Image
                  src={organization.coverImage}
                  alt={organization.name}
                  width={500}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}
              {organization.logo && (
                <OrganizationLogo
                  className="absolute bottom-10 left-10"
                  name={organization.name}
                  logoUrl={organization.logo}
                  size="lg"
                />
              )}
            </div>
          </div>
        </div>
      )}>
      <div className="space-y-6">
        <DetailsTitle title="Галерея" />
        <Carousel links={images} />
        {organization.description && (
          <div>
            <DetailsTitle title="Описание" />
            <DetailsDescription description={organization.description} />
          </div>
        )}
        <div>
          <DetailsTitle title="Контакты" />
          <div className="space-y-3">
            <DetailsContactItem
              icon={MapPin}
              link={organization.address} // подвязать какие нибудь карты там 2 гис или яндекс
            />
            {organization.phone && (
              <DetailsContactItem icon={Phone} link={`tel:${organization.phone}`} />
            )}
            {organization.website && (
              <DetailsContactItem
                icon={Globe}
                link={organization.website}
                target="_blank"
                rel="noopener noreferrer" //poka noreferrer
              />
            )}
          </div>
        </div>
        <div>
          <DetailsTitle title="Тип" />
          <DetailsTypeItem type={organization.type} />
        </div>
        {organization.stories && organization.stories.length > 0 && (
          <div>
            <DetailsTitle title={"Сторисы"} />
            <DetailsDescription description={`Всего: ${organization.stories.length}`} />
          </div>
        )}
        <p
          className={`px-3 inline-block py-1 rounded-full text-sm ${
            organization.isActive
              ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}>
          {organization.isActive ? "Активно" : "Неактивно"}
        </p>
      </div>
    </Drawer>
  );
}
