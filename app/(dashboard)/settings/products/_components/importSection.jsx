import CustomButton from "@/components/CustomButton";
import { SquareArrowOutDownLeft } from "lucide-react";

export default function ImportProductAndServicesSection() {
  return (
    <div className="w-full shadow-md rounded-lg p-6 border border-ct-text-secondary space-y-4 animate-fadeIn">
      <h3 className="text-2xl font-bold">Import Products and Services</h3>
      <div className="flex justify-between">
        <div className="">
          <p className="mb-2">
            Bulk import your products & services by uploading a .csv exported
            from programs like Microsoft Excel, Google sheets, or Numbers.
            Download our{" "}
            <a
              href="https://secure.getjobber.com/work_items/sample_import_template"
              className="text-green-600"
            >
              sample file
            </a>{" "}
            for tips on how to format your CSV file.
          </p>
          <p>
            Learn more about Importing Products and Services in our{" "}
            <a
              href="https://help.getjobber.com/hc/en-us/articles/115009735848#h_94f67aba-cb8c-45c1-bea4-2e33dcc73fd2"
              className="text-green-600"
            >
              Help Center
            </a>
            .
          </p>
        </div>
        <div className="flex min-w-40 w-fit items-start justify-end">
          <CustomButton
            title={
              <>
                <SquareArrowOutDownLeft className="size-5" /> Import CSV
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}
