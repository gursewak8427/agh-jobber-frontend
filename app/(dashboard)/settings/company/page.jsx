import { Input } from "../_components/input";
import { Label } from "../_components/label";

export default function CompanySetting() {
  return (
    <div className="space-y-6 h-full">
      <h2 className="text-4xl font-bold">Company Settings</h2>
      <div className="w-full max-w-4xl shadow-md rounded-lg p-6 border border-[#9ca3af] space-y-4 animate-fadeIn">
        <h3 className="text-2xl font-bold">Company Details</h3>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="company-name">Company Name</Label>
          <Input
            id="company-name"
            className=""
            placeholder="The wool company"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="phone-number">Phone number</Label>
          <Input id="phone-number" className="" placeholder="1234567890" />
          <span className="text-sm text-[#9ca3af]">
            Calls made to your{" "}
            <a href="#" className="text-green-600">
              dedicated phone number
            </a>{" "}
            will forward to this number
          </span>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="website-url">Website URL</Label>
          <Input id="website-url" className="" placeholder="website.co.ca" />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" className="" placeholder="user@website.co.ca" />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="street-1">Physical Address</Label>
          <div className="grid md:grid-cols-2">
            <Input
              id="street-1"
              className="md:col-span-2 rounded-b-none"
              placeholder="Street 1"
            />
            <Input
              id="street-2"
              className="md:col-span-2 rounded-none"
              placeholder="Street 2"
            />
            <Input id="city" className="rounded-none" placeholder="City" />
            <Input
              id="province"
              className="rounded-none"
              placeholder="Province"
            />
            <Input
              id="postal-code"
              className="rounded-none rounded-bl-md"
              placeholder="Postal Code"
            />
            <Input
              id="country"
              className="rounded-none rounded-br-md"
              placeholder="Country"
              type="select"
            />
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl shadow-md rounded-lg p-6 border border-[#9ca3af] space-y-4 animate-fadeIn">
      <h3 className="text-2xl font-bold">Business Hours</h3>
      </div>
    </div>
  );
}
