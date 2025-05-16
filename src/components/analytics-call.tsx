"use client";
import axios from "axios";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import localData from "../../data/manual/exploit_data/exploits.json";
import { ExploitItem } from "@/types/exploits";
import { useView } from "@/context/ViewContext";
// Define the API response structure
interface ApiResponse {
  code?: number;
  data?: {
    items?: ExploitItem[];
    currentPage?: number;
    lastPage?: number;
    total?: number;
    meta?: {
      total_items?: number;
      current_page?: number;
      last_page?: number;
      processed_at?: string;
      processing_version?: string;
    };
  };
}
const localDataFallback: ExploitItem[] = localData.exploits_data.map(
  (item) => ({
    ...item,
    network: item.network?.name || "", // Handle null network with fallback
    description: {
      ...item.description,
      sections: item.description.sections.map((section) => ({
        ...section,
        title: section.title || "", // Convert null titles to empty string
      })),
    },
  })
);
import { useEffect, useState } from "react";
import { ChartExploitsArea } from "@/components/chart-exploits-area";
import { ExploitsTable } from "@/components/table-form";
import { AnalyticsChart } from "@/app/analytics/page";

export default function AnalyticsCall() {
  const [exploitdata, setData] = useState<ExploitItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalExploits, setTotalExploits] = useState<number | null>(null);
  useEffect(() => {
    setLoading(true);
    axios
      .get<ApiResponse>("https://solana-exploits-tracker.onrender.com/scrape")
      .then((res) => {
        if (res.data?.data?.items) {
          //Check which data is more recent

          if (
            res.data?.data?.items[0]?.date?.timestamp >=
            localDataFallback[0]?.date?.timestamp
          ) {
            setData(res.data.data.items);
            setTotalExploits(
              res.data.data.meta?.total_items ||
                res.data.data.total ||
                res.data.data.items.length
            );
          }
        } else {
          // Fallback to local data if API response is not as expected
          setData(localDataFallback);
          setTotalExploits(localDataFallback.length);

          setError("API response format was unexpected. Using local data.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        // Use local data as fallback
        setData(localDataFallback);
        setTotalExploits(localDataFallback.length);
        setError("Failed to fetch data from API. Using local data.");
        setLoading(false);
      });
  }, []);
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-0 md:gap-6 md:py-0">
        <div className="px-4 lg:px-6">
          <AnalyticsChart exploits={exploitdata} />
        </div>
      </div>
    </div>
  );
}
