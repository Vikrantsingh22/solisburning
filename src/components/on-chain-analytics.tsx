// import { DuneClient } from "@duneanalytics/client-sdk";
// const dune = new DuneClient(process.env.NEXT_PUBLIC_DUNE_API_KEY!);
// const query_resultFailedTransactions = await dune.getLatestResult({
//   queryId: 3537204,
// });
// const query_resultHighFrequencysigner = await dune.getLatestResult({
//   queryId: 5065871,
// });

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Info, Loader2 } from "lucide-react";
import { fetchFailedTransactions, fetchHighFrequencySigners } from "@/lib/dune-api";

export default function TransactionsDashboard() {
  const [highFrequencySigners, setHighFrequencySigners] = useState<any[]>([]);
  const [failedTransactions, setFailedTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [failedTxData, highFreqData] = await Promise.all([
          fetchFailedTransactions(),
          fetchHighFrequencySigners()
        ]);
        setFailedTransactions(failedTxData);
        setHighFrequencySigners(highFreqData);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data from Dune API. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Format the data for the bar chart
  const chartData = failedTransactions.map((item) => ({
    date: item.day,
    "Failed Transactions": item.total_failed,
    "Failure Rate": (item.failed_rate * 100).toFixed(2),
  }));

  const pageCount = Math.ceil(highFrequencySigners.length / itemsPerPage);
  const paginatedSigners = highFrequencySigners.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Blockchain Transactions Analytics
      </h1>

      <Tabs defaultValue="failed" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="failed">Failed Transactions</TabsTrigger>
          <TabsTrigger value="highFrequency">
            High Frequency Signers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="failed" className="space-y-4">
          <Alert className="mb-4 bg-amber-50">
            <Info className="h-4 w-4" />
            <AlertTitle>Important Notice</AlertTitle>
            <AlertDescription>
              Data shows significant transaction failure rates, with up to {Math.max(...failedTransactions.map(tx => tx.failed_rate * 100)).toFixed(1)}%
              failures recorded on {failedTransactions.find(tx => tx.failed_rate === Math.max(...failedTransactions.map(tx => tx.failed_rate)))?.day}.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {failedTransactions.map((item, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{item.day}</CardTitle>
                  <CardDescription>
                    Transaction Failure Analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(item.failed_rate * 100).toFixed(2)}%
                  </div>
                  <p className="text-muted-foreground">Failure Rate</p>
                  <div className="mt-2 text-sm">
                    Total Failed: {item.total_failed.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Failed Transactions Trend</CardTitle>
              <CardDescription>
                Visual representation of failed transactions and failure rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#82ca9d"
                    />
                    <Tooltip />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="Failed Transactions"
                      fill="#8884d8"
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="Failure Rate"
                      fill="#82ca9d"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Failed Transactions Data</CardTitle>
              <CardDescription>
                Detailed view of failed transactions by date
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Total Failed</TableHead>
                    <TableHead className="text-right">Failure Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {failedTransactions.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.day}</TableCell>
                      <TableCell className="text-right">
                        {item.total_failed.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {(item.failed_rate * 100).toFixed(2)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="highFrequency">
          <Card>
            <CardHeader>
              <CardTitle>High Frequency Signers</CardTitle>
              <CardDescription>
                Signers with more than 100,000 transactions within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Signer</TableHead>
                    <TableHead className="text-right">
                      Transaction Count
                    </TableHead>
                    <TableHead>First Transaction</TableHead>
                    <TableHead>Last Transaction</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedSigners.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono text-xs">
                        {item.signer}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.tx_count.toLocaleString()}
                      </TableCell>
                      <TableCell>{item.first_tx}</TableCell>
                      <TableCell>{item.last_tx}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(0, prev - 1))
                  }
                  disabled={currentPage === 0}
                  className="px-3 py-1 rounded bg-slate-200 disabled:opacity-50"
                >
                  Previous
                </button>
                <span>
                  Page {currentPage + 1} of {pageCount}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(pageCount - 1, prev + 1))
                  }
                  disabled={currentPage === pageCount - 1}
                  className="px-3 py-1 rounded bg-slate-200 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Data retrieved from Dune Analytics query 5065871
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
