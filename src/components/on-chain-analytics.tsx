// import { DuneClient } from "@duneanalytics/client-sdk";
// const dune = new DuneClient(process.env.NEXT_PUBLIC_DUNE_API_KEY!);
// const query_resultFailedTransactions = await dune.getLatestResult({
//   queryId: 3537204,
// });
// const query_resultHighFrequencysigner = await dune.getLatestResult({
//   queryId: 5065871,
// });

import { useState } from "react";
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
import { Info } from "lucide-react";

export default function TransactionsDashboard() {
  // Data for high frequency signers
  const highFrequencySigners = [
    {
      signer: "7qbNi8QFrREPfz6iBzTQ483dPzTDeZj4bDpknvNvNs7x",
      tx_count: 2932589,
      first_tx: "2025-04-29 22:51",
      last_tx: "2025-04-30 22:48",
    },
    {
      signer: "CzYQ2kFnBxsNEt9Zy34vQ3n5fSDhvA4o4XaTnq1rLvyr",
      tx_count: 2735535,
      first_tx: "2025-04-29 22:51",
      last_tx: "2025-04-30 22:48",
    },
    {
      signer: "3pjWyeFUPa9Sppf15BAJYim4K2kVZThbLbYzThhLUBbG",
      tx_count: 2640761,
      first_tx: "2025-04-29 22:51",
      last_tx: "2025-04-30 22:47",
    },
    {
      signer: "rm4cojNDeUfFQZBMVUSTuxFn15dpAmygaaqyaaWqbUC",
      tx_count: 2458044,
      first_tx: "2025-04-29 22:51",
      last_tx: "2025-04-30 22:48",
    },
    {
      signer: "CKWXpDkudKoVDhhDJC7uRd5Ccb8eaBv2TWfTpLB539DC",
      tx_count: 2423901,
      first_tx: "2025-04-29 22:51",
      last_tx: "2025-04-30 22:48",
    },
    {
      signer: "HXzkkswG8A2etA2nWWQg6NQKoy4zXrZP5JmXYFrYNRdz",
      tx_count: 1975775,
      first_tx: "2025-04-29 22:51",
      last_tx: "2025-04-30 22:48",
    },
    {
      signer: "cTVLoQdWzfgCArmDYh94fDjAVA6DcCgEf53y3dUzTbP",
      tx_count: 1681742,
      first_tx: "2025-04-29 22:51",
      last_tx: "2025-04-30 22:48",
    },
    {
      signer: "uAngRgGLdeemerpmLampgLJ4ENFMygHPuKdU2nKwBNg",
      tx_count: 1641588,
      first_tx: "2025-04-29 22:51",
      last_tx: "2025-04-30 22:48",
    },
    {
      signer: "eDqdPqBnLYdwBfDDHzzkeXXBFYEyU21ieLhCsPgnbSo",
      tx_count: 1638387,
      first_tx: "2025-04-30 00:10",
      last_tx: "2025-04-30 22:48",
    },
    {
      signer: "oQPnhXAbLbMuKHESaGrbXT17CyvWCpLyERSJA9HCYd7",
      tx_count: 1605184,
      first_tx: "2025-04-29 22:51",
      last_tx: "2025-04-30 22:48",
    },
    {
      signer: "8iQP7Kqj1sSL8ThenF66Fx5mDYpPTPYTeGx9i25os9VG",
      tx_count: 1404302,
      first_tx: "2025-04-29 22:51",
      last_tx: "2025-04-30 22:48",
    },
    {
      signer: "4XBqViD1XYF1qHrErrsXBzDrCapvP9fEFX4LPjXZi9YU",
      tx_count: 1161021,
      first_tx: "2025-04-29 22:51",
      last_tx: "2025-04-30 22:48",
    },
    {
      signer: "8TPWakvWw4xQbk7uAYdNjZiDKKHgv9GE5GebzsbtUaHr",
      tx_count: 1152287,
      first_tx: "2025-04-29 22:51",
      last_tx: "2025-04-30 22:48",
    },
    {
      signer: "updtkJ8HAhh3rSkBCd3p9Z1Q74yJW4rMhSbScRskDPM",
      tx_count: 1045140,
      first_tx: "2025-04-29 22:51",
      last_tx: "2025-04-30 22:48",
    },
    {
      signer: "86JGVSkKzWTBYJam3FVFgibiQEv64127ZobDU8ibtuTu",
      tx_count: 1023348,
      first_tx: "2025-04-29 22:51",
      last_tx: "2025-04-30 22:48",
    },
    {
      signer: "A7FMMgue4aZmPLLoutVtbC7gJcyqkHybUieiaDg9aaVE",
      tx_count: 926625,
      first_tx: "2025-04-29 22:51",
      last_tx: "2025-04-30 22:48",
    },
    {
      signer: "2QfBNK2WDwSLoUQRb1zAnp3KM12N9hQ8q6ApwUMnWW2T",
      tx_count: 884106,
      first_tx: "2025-04-29 22:51",
      last_tx: "2025-04-30 22:48",
    },
    {
      signer: "MfDuWeqSHEqTFVYZ7LoexgAK9dxk7cy4DFJWjWMGVWa",
      tx_count: 588675,
      first_tx: "2025-04-29 22:51",
      last_tx: "2025-04-30 22:48",
    },
    {
      signer: "GzW9nhfuZcDoPaQVcrk7zhm4uVrfnTxqEQAB5bRcdFDX",
      tx_count: 556195,
      first_tx: "2025-04-29 22:51",
      last_tx: "2025-04-30 18:03",
    },
    {
      signer: "DBiFSnJPkNQEuk9zStjhGhSS5UaWQpxTYP4fXYmxfn2w",
      tx_count: 541196,
      first_tx: "2025-04-29 22:51",
      last_tx: "2025-04-30 22:40",
    },
    {
      signer: "FFidPdmHnSVWEHoX6PfTG1DTUjzw4jexpCComf2QBrrh",
      tx_count: 519071,
      first_tx: "2025-04-29 22:51",
      last_tx: "2025-04-30 22:47",
    },
    {
      signer: "6kntKawNmZNKZqUHvRVGKMwp8LQU5upyhht7w1PL7dde",
      tx_count: 515629,
      first_tx: "2025-04-29 22:51",
      last_tx: "2025-04-30 22:48",
    },
    {
      signer: "7H2aMNigJrHi5TtXtDtEN9NFQRp5x7GQR48SUWdZ7SnW",
      tx_count: 455175,
      first_tx: "2025-04-29 22:51",
      last_tx: "2025-04-30 22:48",
    },
    {
      signer: "HQUygbE1xW1JTiQSMxds3VcPe5ZjqzUrCE9gEaweohKK",
      tx_count: 437349,
      first_tx: "2025-04-29 22:51",
      last_tx: "2025-04-30 22:48",
    },
    {
      signer: "6rRiMihF7UdJz25t5QvS7PgP9yzfubN7TBRv26ZBVAhE",
      tx_count: 422342,
      first_tx: "2025-04-29 22:51",
      last_tx: "2025-04-30 22:48",
    },
  ];

  // Data for failed transactions
  const failedTransactions = [
    {
      day: "2025-03-06",
      total_failed: 35704747,
      failed_rate: 0.3911190041650717,
    },
    {
      day: "2023-11-21",
      total_failed: 19984629,
      failed_rate: 0.49117789053354954,
    },
    {
      day: "2024-03-05",
      total_failed: 24538257,
      failed_rate: 0.5379256874998849,
    },
  ];

  // Format the data for the bar chart
  const chartData = failedTransactions.map((item) => ({
    date: item.day,
    "Failed Transactions": item.total_failed,
    "Failure Rate": (item.failed_rate * 100).toFixed(2),
  }));

  // For pagination of high frequency signers
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const pageCount = Math.ceil(highFrequencySigners.length / itemsPerPage);

  const paginatedSigners = highFrequencySigners.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

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
              Data shows significant transaction failure rates, with up to 53.8%
              failures recorded on 2024-03-05.
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
