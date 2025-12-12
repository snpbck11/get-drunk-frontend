import { OrganizationCard, OrganizationCardSkeleton } from "@/entities/organization";
import { organizationsApi } from "@/features/organizations/api/organizations-api";
import { Button, Section } from "@/shared/ui";
import { Suspense } from "react";
import { SectionTitle } from "./section-title";

async function FeaturedOrganizationsList() {
  const result = await organizationsApi.getByPage({ page: 1, limit: 3 }).catch(() => null);

  if (!result) {
    return (
      <div className="col-span-full text-center py-8 text-gray-500">
        Не удалось загрузить организации
      </div>
    );
  }

  const organizations = result.data.items;

  if (organizations.length === 0) {
    return (
      <div className="col-span-full text-center py-8 text-gray-500">Нет доступных организаций</div>
    );
  }

  return (
    <>
      {organizations.map((organization) => (
        <OrganizationCard key={organization.id} organization={organization} withHoverEffect />
      ))}
    </>
  );
}

export function FeaturedOrganizations() {
  return (
    <Section className="bg-gray-100 dark:bg-gray-800">
      <SectionTitle title="Популярные заведения" subtitle="Места с активными сторис прямо сейчас" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense
          fallback={Array.from({ length: 3 }).map((_, index) => (
            <OrganizationCardSkeleton key={index} />
          ))}>
          <FeaturedOrganizationsList />
        </Suspense>
      </div>
      <div className="text-center mt-12">
        <Button href="/organizations" size="lg" variant="secondary">
          Посмотреть все заведения
        </Button>
      </div>
    </Section>
  );
}
