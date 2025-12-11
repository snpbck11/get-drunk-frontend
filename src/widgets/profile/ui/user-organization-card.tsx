"use client";

import { IOrganization } from "@/entities/organization";
import { Building2, MapPin } from "lucide-react";

interface UserOrganizationCardProps {
  organization: IOrganization;
  onClick: (org: IOrganization) => void;
}

export function UserOrganizationCard({ organization, onClick }: UserOrganizationCardProps) {
  return (
    <div
      onClick={() => onClick(organization)}
      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-500 dark:hover:border-purple-400 cursor-pointer transition-all hover:shadow-md">
      <div className="flex items-start gap-3">
        {organization.logo ? (
          <img
            src={organization.logo}
            alt={organization.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
        )}

        <div className="flex-1">
          <h3 className="font-semibold text-lg">{organization.name}</h3>

          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mt-1">
            <MapPin className="w-4 h-4" />
            <span>{organization.address}</span>
          </div>

          {organization.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
              {organization.description}
            </p>
          )}

          <div className="flex gap-2 mt-2">
            {organization.isVerified && (
              <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                Подтверждено
              </span>
            )}
            <span
              className={`text-xs px-2 py-1 rounded ${
                organization.isActive
                  ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}>
              {organization.isActive ? "Активно" : "Неактивно"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
