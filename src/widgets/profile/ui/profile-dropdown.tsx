"use client";

import { logoutUser } from "@/features/auth";
import { CreateOrganizationModal } from "@/features/organizations/ui/create-organization-modal";
import { useAppDispatch } from "@/shared/store/hooks";
import { ConfirmModal, IconButton } from "@/shared/ui";
import { Dropdown, DropdownItem, DropdownSeparator, TMenuItem } from "@/shared/ui/dropdown";
import { CircleEllipsis, CirclePlus, LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ProfileDropdown() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isCreateOrganizationModalOpen, setIsCreateOrganizationModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    dispatch(logoutUser());
    setIsLogoutModalOpen(false);
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  const handleCreateOrganizationClick = () => {
    setIsCreateOrganizationModalOpen(true);
  };

  const handleCreateOrganizationClose = () => {
    setIsCreateOrganizationModalOpen(false);
  };

  const menuItems: TMenuItem[] = [
    {
      type: "item",
      label: "Добавить организацию",
      icon: CirclePlus,
      onClick: handleCreateOrganizationClick,
    },
    {
      type: "item",
      label: "Настройки",
      icon: Settings,
      onClick: () => router.push("/settings"),
    },
    { type: "separator" },
    {
      type: "item",
      label: "Выйти",
      icon: LogOut,
      onClick: handleLogoutClick,
      variant: "danger",
    },
  ];

  return (
    <>
      <Dropdown trigger={<IconButton icon={CircleEllipsis} />}>
        {menuItems.map((item, index) =>
          item.type === "separator" ? (
            <DropdownSeparator key={index} />
          ) : (
            <DropdownItem
              key={index}
              icon={item.icon}
              onClick={item.onClick}
              variant={item.variant}>
              {item.label}
            </DropdownItem>
          )
        )}
      </Dropdown>
      {isLogoutModalOpen && (
        <ConfirmModal
          open={isLogoutModalOpen}
          onClose={handleLogoutCancel}
          onConfirm={handleLogoutConfirm}
          title="Выход из аккаунта"
          description="Вы уверены, что хотите выйти из аккаунта?"
          confirmText="Выйти"
          cancelText="Отмена"
          variant="danger"
        />
      )}
      {isCreateOrganizationModalOpen && (
        <CreateOrganizationModal
          open={isCreateOrganizationModalOpen}
          onClose={handleCreateOrganizationClose}
        />
      )}
    </>
  );
}
