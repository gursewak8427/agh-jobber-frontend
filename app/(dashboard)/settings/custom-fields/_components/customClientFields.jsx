import CustomButton from "@/components/CustomButton";
import { Ellipsis, GripVertical, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../_components/dropdown";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../_components/dialog";

export default function ClientCustomFields() {
  const fields = [{ name: "Custom Name", description: "Stores text value" }];
  return (
    <div className="w-full shadow-md rounded-lg p-6 border border-ct-text-secondary space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Client Custom Fields</h3>
        <CustomButton title={"Add field"} />
      </div>
      {fields.length > 0 ? (
        <div className="grid gap-2">
          <Dialog>
            {fields.map((field) => (
              <div className="grid grid-cols-8" key={field.name}>
                <GripVertical className="size-5" />
                <DialogTrigger
                  className="text-green-600 hover:underline col-span-3"
                  asChild
                >
                  <span className="hover:cursor-pointer">{field.name}</span>
                </DialogTrigger>
                <div className="truncate col-span-3">{field.description}</div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-green-600" asChild>
                    <span className="flex justify-end px-3">
                      <Ellipsis className="size-5 hover:cursor-pointer" />
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Archive</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{"{{Field Name}}"}</DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>
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
    </div>
  );
}
