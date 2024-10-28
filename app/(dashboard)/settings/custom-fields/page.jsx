"use client";
import { useEffect } from "react";
import ClientCustomFields from "./_components/customClientFields";
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
  const {
    clientcustomfields,
    propertycustomfields,
    jobcustomfields,
    invoicecustomfields,
    quotecustomfields,
  } = useSelector((state) => state.clients);
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
      <ClientCustomFields type="client" />
      <ClientCustomFields type="property" />
      <ClientCustomFields type="job" />
      <ClientCustomFields type="invoice" />
      <ClientCustomFields type="quote" />
    </div>
  );
}
