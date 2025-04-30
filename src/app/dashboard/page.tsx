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
import data from "./data.json";
import { useEffect, useState } from "react";
import { ChartExploitsArea } from "@/components/chart-exploits-area";
import { ExploitsTable } from "@/components/table-form";
import Dashboard from "../analytics/page";
import ResourcesComponent from "@/components/resources";
import TransactionsDashboard from "@/components/on-chain-analytics";

export default function Page() {
  const [exploitdata, setData] = useState<ExploitItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalExploits, setTotalExploits] = useState<number | null>(null);

  const { activeView } = useView();

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
          {activeView === "Dashboard" && (
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />
                <div className="px-4 lg:px-6">
                  <ChartExploitsArea exploits={exploitdata} />
                  {/* <ChartAreaInteractive /> */}
                </div>
                {/* <DataTable data={data} /> */}
                <div className="px-4 lg:px-6">
                  <h1 className="text-3xl font-bold tracking-tight mb-2">
                    Exploit History
                  </h1>
                  <p className="text-muted-foreground mb-6">
                    A rehashed database of exploits in the Solana ecosystem
                  </p>
                  <ExploitsTable />
                </div>
              </div>
            </div>
          )}
          {activeView === "Analytics" && (
            <div className="@container/main flex flex-1 flex-col gap-2">
              <Dashboard />
            </div>
          )}

          {activeView === "Exploits" && (
            <div className="@container/main flex flex-1 flex-col gap-2">
              <ExploitsTable />
            </div>
          )}
          {activeView === "Resources" && (
            <div className="@container/main flex flex-1 flex-col gap-2">
              <ResourcesComponent />
            </div>
          )}
          {activeView === "Onchain Analytics" && (
            <div className="@container/main flex flex-1 flex-col gap-2">
              <TransactionsDashboard />
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
