"use client";

import { OrganizationCard, OrganizationCardSkeleton } from "@/entities/organization";
import { getOrganizations } from "@/features/organizations/model/organizations-thunk";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { useCallback, useEffect, useRef } from "react";

export function OrganizationsViewer() {
  const observer = useRef<IntersectionObserver>(null);
  const { organizations, isLoading, error, hasMore, page } = useAppSelector(
    (state) => state.organizations
  );
  const dispatch = useAppDispatch();

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(getOrganizations(page));
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, page, dispatch]
  );

  useEffect(() => {
    if (organizations.length === 0) {
      dispatch(getOrganizations(page));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-xl">Не удалось загрузить заведения, обновите страницу</p>
      </div>
    );
  }

  return (
    <div className="p-10 grid md:grid-cols-2 xl:grid-cols-3 flex-col gap-6">
      {organizations?.map((org, index) => {
        if (organizations.length === index + 1) {
          return (
            <div key={org.id} ref={lastElementRef}>
              <OrganizationCard organization={org} />
            </div>
          );
        }
        return <OrganizationCard key={org.id} organization={org} />;
      })}

      {isLoading &&
        Array.from({ length: 9 }).map((_, index) => (
          <OrganizationCardSkeleton key={`skeleton-${index}`} />
        ))}
    </div>
  );
}
