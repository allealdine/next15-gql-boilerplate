import { Locale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import PageLayout from "@/components/PageLayout";
import LocaleSwitcher from "@/components/LocateSwitcher";
import Link from "next/link";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default function IndexPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations("IndexPage");

  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[70vh] px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        {t("title")}
      </h1>
      <p className="max-w-xl text-lg text-gray-600 dark:text-gray-300 mb-6">
        {t.rich("description", {
          code: (chunks) => (
            <code className="bg-gray-800 text-white px-2 py-1 rounded text-sm font-mono">
              {chunks}
            </code>
          ),
        })}
      </p>

      <div className="flex gap-4">
        <Link
          href="/faqs"
          className="px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
        >
          {t("getStarted")}
        </Link>

        <Link
          href="https://github.com/your-repo"
          target="_blank"
          className="px-6 py-3 text-sm font-medium text-blue-600 border border-blue-600 hover:bg-blue-50 rounded-lg transition"
        >
          GitHub
        </Link>
      </div>

      <div className="mt-10">
        <LocaleSwitcher />
      </div>
    </section>
  );
}
