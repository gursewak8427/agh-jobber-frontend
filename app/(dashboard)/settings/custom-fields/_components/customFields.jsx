import CustomButton from "@/components/CustomButton";
import { Ellipsis, GripVertical, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../_components/dropdown";
import { useSelector } from "react-redux";
import { useState } from "react";
import AddCustomFields from "@/app/_components/CustomFields";

export default function CustomFieldsCard({ type = "client" }) {
  const {
    clientcustomfields,
    propertycustomfields,
    jobcustomfields,
    invoicecustomfields,
    quotecustomfields,
  } = useSelector((state) => state.clients);
  const [fieldData, setFieldData] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);

  let fields = [];
  switch (type) {
    case "client":
      fields = clientcustomfields;
      break;

    case "property":
      fields = propertycustomfields;
      break;

    case "job":
      fields = jobcustomfields;
      break;

    case "invoice":
      fields = invoicecustomfields;
      break;

    case "quote":
      fields = quotecustomfields;
      break;

    default:
      break;
  }

  return (
    <div className="w-full shadow-md rounded-lg p-6 pb-4 border border-ct-text-secondary space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold capitalize">{type} Custom Fields</h3>
        <CustomButton title={"Add field"} onClick={() => setDialogOpen(type)} />
      </div>
      {fields.length > 0 ? (
        <div className="grid gap-2">
          {fields.map((field) => (
            <div className="flex gap-2 pr-3 items-center" key={field.id}>
              <GripVertical className="size-5 grow-0 shrink-0" />
              <div className="grid grid-cols-2 grow">
                <button
                  className="hover:cursor-pointer text-left text-green-600 hover:underline w-fit"
                  onClick={() => {
                    setDialogOpen(type);
                    setFieldData(field);
                  }}
                >
                  {field.field_name}
                </button>
                <div className="truncate">Stores {field.field_type} value</div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-green-600">
                  <Ellipsis className="size-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Archive</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
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
      <AddCustomFields open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
}
