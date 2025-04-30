"use client";
import axios from "axios";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { useEffect, useState } from "react";

// import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Import local data as fallback
import localData from "../../data/manual/exploit_data/exploits.json";
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
// Cast and validate the local data
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

export function SectionCards() {
  const [data, setData] = useState<ExploitItem[] | null>(null);
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

  // Calculate total funds lost
  const totalFundsLost =
    data?.reduce((sum, item) => sum + (item.funds_lost || 0), 0) || 0;

  // Calculate funds recovered
  const totalFundsRecovered =
    data?.reduce(
      (sum, item) =>
        sum + (item.funds_recovered || 0) + (item.funds_returned || 0),
      0
    ) || 0;

  // Calculate recovery percentage
  const recoveryPercentage =
    totalFundsLost > 0
      ? Math.round((totalFundsRecovered / totalFundsLost) * 100) / 100
      : 0;

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {error && (
        <div className="col-span-full rounded-md bg-destructive/15 p-4 text-destructive">
          {error}
        </div>
      )}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Exploits Reported</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loading ? "Loading..." : totalExploits}
          </CardTitle>
          <CardAction></CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Exploits tracked and verified <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Data updated regularly from multiple sources
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Funds Lost</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loading
              ? "Loading..."
              : `$${(totalFundsLost / 1000000).toFixed(1)}M`}
          </CardTitle>
          <CardAction></CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Estimated total value lost in exploits{" "}
            <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Across all tracked incidents
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Funds Recovered</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loading
              ? "Loading..."
              : `$${(totalFundsRecovered / 1000000).toFixed(1)}M`}
          </CardTitle>
          <CardAction></CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Funds returned or recovered <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Through various recovery efforts
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Recovery Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loading
              ? "Loading..."
              : `${(recoveryPercentage * 100).toFixed(1)}%`}
          </CardTitle>
          <CardAction></CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Percentage of lost funds recovered{" "}
            <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Trending down as new exploits occur
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
