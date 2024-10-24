import BusinessHoursSection from "./_components/businessHoursSection";
import CompanyDetailsSection from "./_components/companyDetailsSection";
import TaxSettingsSection from "./_components/taxSettingsSection";

export default function CompanySetting() {
  return (
    <div className="space-y-6 h-full">
      <h2 className="text-4xl font-bold">Company Settings</h2>
      <CompanyDetailsSection />
      <BusinessHoursSection/>
      <TaxSettingsSection />
    </div>
  );
}
