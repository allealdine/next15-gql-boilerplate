"use client";

import { LIMIT_HUNDRED } from "@/lib/constants";
import { useFAQs } from "@/graphql/faqs";

export default function Faqs() {
  const { faqs, isLoading, error } = useFAQs({
    faq_type: "global",
    issued_by: "Super Admin",
    limit: LIMIT_HUNDRED,
  });

  if (isLoading) {
    return <div>Loading FAQs...</div>;
  }

  if (error) {
    return <div>Error loading FAQs: {error.message}</div>;
  }

  if (!faqs?.length) {
    return <div>No FAQs available.</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Frequently Asked Questions</h1>
      {faqs.map((faq) => (
        <div key={faq.id} className="border p-4 rounded shadow-sm">
          <h2 className="text-lg font-medium">{faq.faq_title}</h2>
          <p className="text-sm text-gray-700">{faq.faq_description}</p>
        </div>
      ))}
    </div>
  );
}
