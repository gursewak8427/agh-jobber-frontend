import { Label } from "../../_components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../_components/select";

export default function RegionalSettingsSection() {
  return (
    <div className="w-full shadow-md rounded-lg p-6 border border-ct-text-secondary space-y-4 animate-fadeIn">
      <h3 className="text-2xl font-bold">Regional Settings</h3>
      <div className="">
        <Label>Countries</Label>
        <Select defaultValue="india">
          <SelectTrigger className="">
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
      <div className="">
        <Label>Timezone</Label>
        <Select defaultValue="1">
          <SelectTrigger className="">
            <SelectValue placeholder="Select Timezone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">GMT</SelectItem>
            <SelectItem value="2">IST</SelectItem>
            <SelectItem value="3">UST</SelectItem>
            <SelectItem value="4">Whatever</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="">
        <Label>Date Format</Label>
        <Select defaultValue="1">
          <SelectTrigger className="">
            <SelectValue placeholder="Select Date Format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">31/01/2024</SelectItem>
            <SelectItem value="2">01/31/2024</SelectItem>
            <SelectItem value="3">2024-01-31</SelectItem>
            <SelectItem value="4">Jan 31, 2024</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="">
        <Label>Time Format</Label>
        <Select defaultValue="1">
          <SelectTrigger className="">
            <SelectValue placeholder="Select Time Format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">12 Hour (1:30pm)</SelectItem>
            <SelectItem value="2">24 Hour (13:30)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="">
        <Label>First Day of The Week</Label>
        <Select defaultValue="1">
          <SelectTrigger className="">
            <SelectValue placeholder="Select Day" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Monday</SelectItem>
            <SelectItem value="2">Sunday</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

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
