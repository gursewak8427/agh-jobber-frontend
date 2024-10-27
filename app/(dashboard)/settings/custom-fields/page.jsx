import ClientCustomFields from "./_components/customClientFields";

export default function CustomFields() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold">Custom Fields</h2>
        <p className="text-ct-text-secondary">
          Track additional information specific to your business with custom
          fields.
        </p>
      </div>
      <ClientCustomFields />
      <ClientCustomFields />
      <ClientCustomFields />
      <ClientCustomFields />
    </div>
  );
}
