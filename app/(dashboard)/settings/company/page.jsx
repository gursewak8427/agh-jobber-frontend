import CustomButton from "@/components/CustomButton";
import BusinessHoursSection from "./_components/businessHoursSection";
import CompanyDetailsSection from "./_components/companyDetailsSection";
import RegionalSettingsSection from "./_components/regionalSettingsSection";
import TaxSettingsSection from "./_components/taxSettingsSection";

export default function CompanySetting() {
  return (
    <div className="space-y-6">
      <h2 className="text-4xl font-bold">Company Settings</h2>
      <CompanyDetailsSection />
      <BusinessHoursSection/>
      <TaxSettingsSection />
      <RegionalSettingsSection />
      <div className="flex flex-col items-end">
        <CustomButton title={'Update'} variant={'primary'} />
      </div>
    </div>
  );
}
