import { Switch } from "../../_components/switch";

export default function CostSection() {
  return (
    <div className="w-full shadow-md rounded-lg p-6 border border-ct-text-secondary space-y-4 animate-fadeIn">
      <h3 className="text-2xl font-bold">Costs</h3>
      <div className="flex items-center justify-between">
        <div className="">
          <p className="font-semibold">Product & Service Costs</p>
          <p>Add costs to your products and services on quotes and jobs</p>
        </div>
        <Switch />
      </div>
    </div>
  );
}
