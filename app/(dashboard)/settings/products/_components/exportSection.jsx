import CustomButton from "@/components/CustomButton";
import { SquareArrowOutUpRight } from "lucide-react";

export default function ExportProductAndServicesSection() {
  return (
    <div className="w-full shadow-md rounded-lg p-6 border border-ct-text-secondary space-y-4 animate-fadeIn">
      <h3 className="text-2xl font-bold">Export Products and Services</h3>
      <div className="flex justify-between">
        <div className="">
          <p className="mb-2">
            Export all products & services from this Jobber account.
          </p>
          <p>
            Check out{" "}
            <a
              href="https://help.getjobber.com/hc/en-us/articles/115009735848#h_94f67aba-cb8c-45c1-bea4-2e33dcc73fd2"
              className="text-green-600"
            >
              Exporting Products
            </a>{" "}
            & Services in the Help Center for more information.
          </p>
        </div>
        <div className="flex min-w-40 w-fit items-start justify-end">
          <CustomButton
            title={
              <>
                <SquareArrowOutUpRight className="size-5" /> Export CSV
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}
