"use client";

import { IOrganization, OrganizationCard } from "@/entities/organization";
import { UserAvatar } from "@/entities/user/ui/user-avatar";
import { getUserOrganizations } from "@/features/profile";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { SpinnerLoader } from "@/shared/ui";
import { AuthBanner } from "@/widgets/auth";
import { useEffect, useState } from "react";
import { OrganizationDetailsDrawer } from "./organization-details-drawer";
import { ProfileDropdown } from "./profile-dropdown";

export function ProfileContent() {
  const { user, isAuthChecked } = useAppSelector((state) => state.auth);
  const { organizations } = useAppSelector((state) => state.userOrganizations);
  const dispatch = useAppDispatch();

  const [selectedMyOrg, setSelectedMyOrg] = useState<IOrganization | null>(null);

  const handleMyOrgClick = (org: IOrganization) => {
    setSelectedMyOrg(org);
  };

  const handleCloseMyOrgDrawer = () => {
    setSelectedMyOrg(null);
  };

  useEffect(() => {
    if (user) {
      dispatch(getUserOrganizations());
    }
  }, [user, dispatch]);

  if (!isAuthChecked) {
    return (
      <div className="h-full flex items-center justify-center">
        <SpinnerLoader className="w-8 h-8" />
      </div>
    );
  }

  if (!user) {
    return <AuthBanner />;
  }

  return (
    <div className="flex flex-col p-6">
      <div className="flex justify-between mb-2">
        <div className="flex items-center gap-3">
          <UserAvatar
            firstName={user.firstName}
            lastName={user.lastName}
            // imageUrl="https://images.unsplash.com/photo-1764712754791-8627ebded3f6?q=80&w=690&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <h2 className="font-bold text-3xl">{`${user.firstName} ${user.lastName}`}</h2>
        </div>
        <ProfileDropdown />
      </div>
      {organizations.length !== 0 && (
        <div>
          <h3 className="font-bold mb-2">Мои организации</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {organizations.map((org) => (
              <OrganizationCard
                key={org.id}
                organization={org}
                onClick={() => handleMyOrgClick(org)}
              />
            ))}
          </div>
        </div>
      )}
      {selectedMyOrg && (
        <OrganizationDetailsDrawer
          organization={selectedMyOrg}
          isOpen={!!selectedMyOrg}
          onClose={handleCloseMyOrgDrawer}
        />
      )}
    </div>
  );
}
