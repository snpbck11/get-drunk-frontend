import { CategoriesSection, FeaturedOrganizations, HowItWorks, MainSection } from "@/widgets/welcome";

export default function WelcomePage() {
  return (
    <div className="min-h-screen">
      <MainSection />
      <CategoriesSection />
      <FeaturedOrganizations />
      <HowItWorks />
    </div>
  );
}