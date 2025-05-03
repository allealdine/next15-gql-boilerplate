import type { FaqsQueryOptions } from "@/types";
import { NetworkStatus } from "@apollo/client";
import { LIMIT, LIMIT_HUNDRED } from "@/lib/constants";
import { useFaqsQuery } from "./gql/faqs.graphql";
import { useSearchParams, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useEffect } from "react";

export function useFAQs({
  issued_by,
  limit,
  shop_id,
  faq_type,
  ...params
}: Partial<FaqsQueryOptions>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const locale = useLocale();

  const query = Object.fromEntries(searchParams.entries()); // convert to object

  const {
    data,
    loading: isLoading,
    error,
    fetchMore,
    networkStatus,
  } = useFaqsQuery({
    variables: {
      language: locale,
      first: LIMIT_HUNDRED,
    },
    notifyOnNetworkStatusChange: true,
  });

  // Add logging for the query result
  useEffect(() => {
    if (isLoading) {
      console.log("Fetching FAQs data...");
    } else if (error) {
      console.error("Error fetching FAQs data:", error);
    } else if (data) {
      console.log("Successfully fetched FAQs data:", data);
    }
  }, [isLoading, error, data]);

  function handleLoadMore() {
    if (data?.faqs?.paginatorInfo.hasMorePages) {
      fetchMore({
        variables: {
          page: data?.faqs?.paginatorInfo?.currentPage + 1,
        },
      });
    }
  }
  return {
    faqs: data?.faqs?.data ?? [],
    paginatorInfo: data?.faqs?.paginatorInfo,
    isLoading,
    error,
    isLoadingMore: networkStatus === NetworkStatus.fetchMore,
    loadMore: handleLoadMore,
    hasMore: Boolean(data?.faqs?.paginatorInfo?.hasMorePages),
  };
}
