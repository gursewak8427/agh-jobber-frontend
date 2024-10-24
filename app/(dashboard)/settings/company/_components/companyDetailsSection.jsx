import { Input } from "../../_components/input";
import { Label } from "../../_components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../_components/select";

const countries = [
    { id: "AF", name: "Afghanistan" },
    { id: "AX", name: "Aland Islands" },
    { id: "AL", name: "Albania" },
    { id: "DZ", name: "Algeria" },
    { id: "AS", name: "American Samoa" },
    { id: "AD", name: "Andorra" },
    { id: "AO", name: "Angola" },
    { id: "AI", name: "Anguilla" },
    { id: "AQ", name: "Antarctica" },
    { id: "AG", name: "Antigua and Barbuda" },
    { id: "AR", name: "Argentina" },
    { id: "AM", name: "Armenia" },
    { id: "AW", name: "Aruba" },
    { id: "AU", name: "Australia" },
    { id: "AT", name: "Austria" },
    { id: "AZ", name: "Azerbaijan" },
    { id: "BS", name: "Bahamas" },
    { id: "BH", name: "Bahrain" },
    { id: "BD", name: "Bangladesh" },
    { id: "BB", name: "Barbados" },
    { id: "BY", name: "Belarus" },
    { id: "BE", name: "Belgium" },
    { id: "BZ", name: "Belize" },
    { id: "BJ", name: "Benin" },
    { id: "BM", name: "Bermuda" },
    { id: "BT", name: "Bhutan" },
    { id: "BO", name: "Bolivia" },
    { id: "BQ", name: "Bonaire, Sint Eustatius and Saba" },
    { id: "BA", name: "Bosnia and Herzegovina" },
    { id: "BW", name: "Botswana" },
    { id: "BV", name: "Bouvet Island" },
    { id: "BR", name: "Brazil" },
    { id: "IO", name: "British Indian Ocean Territory" },
    { id: "BN", name: "Brunei Darussalam" },
    { id: "BG", name: "Bulgaria" },
    { id: "BF", name: "Burkina Faso" },
    { id: "BI", name: "Burundi" },
    { id: "KH", name: "Cambodia" },
    { id: "CM", name: "Cameroon" },
    { id: "CA", name: "Canada" },
    { id: "CV", name: "Cape Verde" },
  ];
  
  export default function CompanyDetailsSection() {
    return <div className="w-full -z-10 max-w-4xl shadow-md rounded-lg p-6 border border-ct-text-secondary space-y-4 animate-fadeIn">
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
      <span className="text-sm text-ct-text-secondary">
        Calls made to your{" "}
        <a href="#" className="text-green-600 hover:underline">
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
          className="md:col-span-2 rounded-b-none border-b-0"
          placeholder="Street 1"
        />
        <Input
          id="street-2"
          className="md:col-span-2 rounded-none border-b-0"
          placeholder="Street 2"
        />
        <Input
          id="city"
          className="rounded-none border-b-0"
          placeholder="City"
        />
        <Input
          id="province"
          className="rounded-none border-b-0 border-l-0"
          placeholder="Province"
        />
        <Input
          id="postal-code"
          className="rounded-none rounded-bl-md"
          placeholder="Postal Code"
        />
        {/* FIXME: The select list is somehow being rendered behind the layout text */}
        <Select defaultValue="india">
          <SelectTrigger className="w-[180px] rounded-t-none rounded-bl-none border-l-0">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.id} value={country.id}>
                {country.name}
              </SelectItem>
            ))}
            <SelectItem value="india">India</SelectItem>
            <SelectItem value="pakistan">Pakistan</SelectItem>
            <SelectItem value="weird-one">
              I don't like the country system
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
}