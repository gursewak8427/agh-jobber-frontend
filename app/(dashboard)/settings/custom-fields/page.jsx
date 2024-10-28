"use client";
import { useEffect } from "react";
import CustomFieldsCard from "./_components/customFields";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClientsCustomFields,
  fetchInvoiceCustomFields,
  fetchJobCustomFields,
  fetchPropertyCustomFields,
  fetchQuoteCustomFields,
} from "@/store/slices/client";

export default function CustomFields() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchClientsCustomFields());
    dispatch(fetchPropertyCustomFields());
    dispatch(fetchJobCustomFields());
    dispatch(fetchInvoiceCustomFields());
    dispatch(fetchQuoteCustomFields());
  }, []);
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold">Custom Fields</h2>
        <p className="text-ct-text-secondary">
          Track additional information specific to your business with custom
          fields.
        </p>
      </div>
      <CustomFieldsCard type="client" />
      <CustomFieldsCard type="property" />
      <CustomFieldsCard type="job" />
      <CustomFieldsCard type="invoice" />
      <CustomFieldsCard type="quote" />
    </div>
  );
}
