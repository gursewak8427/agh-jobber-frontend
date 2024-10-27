import CustomButton from "@/components/CustomButton";
import { User } from "lucide-react";

export default function ClientCustomFields() {
  const fields = [];
  return (
    <div className="w-full shadow-md rounded-lg p-6 border border-ct-text-secondary space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Client Custom Fields</h3>
        <CustomButton title={"Add field"} />
      </div>
      {fields.length > 0 ? (
        ""
      ) : (
        <div className="flex items-center gap-4">
          <span className="flex items-center justify-center size-12 bg-ct-secondary rounded-full text-ct-text-secondary">
            <User className="size-6" />
          </span>
          <div className="-space-y-1">
            <p className="font-semibold">No custom fields</p>
            <p className="">
              Keep track of client details by adding custom fields
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
