"use client";
import axios from "axios";
import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import localData from "../../../data/manual/exploit_data/exploits.json";
import { ExploitItem } from "@/types/exploits";

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
import data from "./data.json";
import { useEffect, useState } from "react";
import { ChartExploitsArea } from "@/components/chart-exploits-area";

export default function Page() {
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
          setData(res.data.data.items);
          // Set total from API meta if available
          setTotalExploits(
            res.data.data.meta?.total_items ||
              res.data.data.total ||
              res.data.data.items.length
          );
        } else {
          // Fallback to local data if API response is not as expected
          setData(localDataFallback);

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
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartExploitsArea exploits={exploitdata} />
                {/* <ChartAreaInteractive /> */}
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
