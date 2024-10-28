import CustomButton from "@/components/CustomButton";
import { Input } from "../_components/input";
import { Search } from "lucide-react";
import CostSection from "./_components/costSection";
import ImportProductAndServicesSection from "./_components/importSection";
import ExportProductAndServicesSection from "./_components/exportSection";
import ServicesTable from "./_components/servicesTable";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold">Products & Services</h2>
        <p className="text-ct-text-secondary">
          Add and update your products & services to stay organized when
          creating quotes, jobs, and invoices.
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="relative flex max-w-md w-full">
            <Search className="absolute inset-y-0 left-3 my-auto size-5 text-ct-text-secondary" />
            <Input className="w-full pl-10" placeholder="Search" />
          </div>
          <CustomButton title={"+ Add Item"} variant={"primary"} />
        </div>
        <ServicesTable />
      </div>
      <CostSection />
      <ImportProductAndServicesSection />
      <ExportProductAndServicesSection />
    </div>
  );
}
