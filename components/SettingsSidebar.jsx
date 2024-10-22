import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  {
    name: "BUSINESS MANAGEMENT",
    links: [
      { name: "Company Settings", href: "/settings/company", tab: "company" },
      { name: "Branding", href: "/settings/branding", tab: "branding" },
      {
        name: "Products & Services",
        href: "/settings/products",
        tab: "products",
      },
      {
        name: "Custom Fields",
        href: "/settings/customfields",
        tab: "customfields",
      },
      {
        name: "Jobber Payments",
        href: "/settings/jobberpayments",
        tab: "jobberpayments",
      },
      {
        name: "Expense Tracking",
        href: "/settings/expensetracking",
        tab: "expensetracking",
      },
      {
        name: "Automations",
        href: "/settings/automations",
        tab: "automations",
      },
    ],
  },
  {
    name: "TEAM ORGANIZATION",
    links: [
      { name: "Manage Team", href: "#" },
      { name: "Work Settings", href: "#" },
      { name: "Schedule", href: "#" },
      { name: "Location Services", href: "#" },
      { name: "Route Optimization", href: "#" },
      { name: "Job Forms", href: "#" },
    ],
  },
  {
    name: "CLIENT COMMUNICATION",
    links: [
      { name: "Client Hub", href: "#" },
      { name: "Emails & Text Messages", href: "#" },
      { name: "Two-way Text Messaging", href: "#" },
      { name: "Requests", href: "#" },
      { name: "Online Booking", href: "#" },
    ],
  },
  {
    name: "CONNECTED APPS",
    links: [{ name: "Apps", href: "#" }],
  },
];

export default function SettingsSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Settings</h2>
      <nav className="space-y-6">
        {categories.map((category, idx) => (
          <div key={idx}>
            {/* Category Header */}
            <h3 className="text-xs font-bold mb-2">{category.name}</h3>

            {/* Subcategory Links */}
            <ul className="space-y-1">
              {category.links.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <Link
                    href={link.href}
                    className={clsx(
                      "text-sm hover:underline tracking-wide",
                      pathname === link.href && "text-green-600 font-semibold"
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
