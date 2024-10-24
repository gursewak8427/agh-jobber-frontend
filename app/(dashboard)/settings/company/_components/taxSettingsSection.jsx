import CustomButton from "@/components/CustomButton";
import { Label } from "../../_components/label";
import { Input } from "../../_components/input";
import { HelpCircle } from "lucide-react";

export default function TaxSettingsSection() {
  return (
    <div className="w-full max-w-4xl shadow-md rounded-lg p-6 border border-ct-text-secondary space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Tax Settings</h3>
        <div className="flex items-center gap-2">
          <CustomButton title={"+ Create Tax Group"} />
          <CustomButton title={"+ Create Tax Rate"} />
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div>
          <Label>Tax ID Name</Label>
          <Input
            placeholder="GST"
            className="max-w-full w-full rounded-r-none"
          />
        </div>
        <div>
          <Label>Tax ID Number</Label>
          <Input placeholder="123456" className="rounded-l-none border-l-0" />
        </div>
        <p className="col-span-2 text-ct-text-secondary text-sm mt-1">Tax ID name and number will appear on invoices.</p>
      </div>
      <hr className="border-ct-text-secondary" />
      <h4 className="inline-flex items-center gap-2">Details <HelpCircle className="size-5" /></h4>
      
    </div>
  );
}
