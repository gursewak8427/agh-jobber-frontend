import CustomButton from "@/components/CustomButton";
import { Label } from "../../_components/label";
import { Input } from "../../_components/input";
import { HelpCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../../_components/radio";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../_components/table";

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
        <p className="col-span-2 text-ct-text-secondary text-sm mt-1">
          Tax ID name and number will appear on invoices.
        </p>
      </div>
      <hr className="border-ct-text-secondary" />
      <h4 className="inline-flex items-center gap-2">
        Details <HelpCircle className="size-5" />
      </h4>
      {/* Tax rate list */}
      <div className="">
        <RadioGroup defaultValue="option-one">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Default</TableHead>
                <TableHead className="font-semibold">
                  <span className="grid grid-cols-2">
                    <span>Name</span>
                    <span>Rate</span>
                  </span>
                </TableHead>
                <TableHead className="font-semibold">Description</TableHead>
                <TableHead className="font-semibold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <span className="flex items-center justify-center">
                    <RadioGroupItem
                      value="option-one"
                      id="option-one"
                      className="scale-150 my-2 mx-auto"
                    />
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Input
                      className="rounded-r-none border-r-0"
                      placeholder="Tax name"
                    />
                    <Input
                      className="rounded-l-none"
                      placeholder="Tax something"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <Input placeholder="Description" />
                </TableCell>
                <TableCell>
                  <CustomButton title={"Remove"} variant={"destructive"} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </RadioGroup>
      </div>
      {/* Tax group list */}
      <div className="">{/* Repeat same here */}</div>
    </div>
  );
}
