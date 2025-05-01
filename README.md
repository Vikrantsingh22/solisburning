# Solana Security Dashboard

This is a [Next.js](https://nextjs.org) app bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), used to track Solana on-chain exploit patterns and failed transactions, combining live Dune Analytics data with scraped historical exploit data.

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Vikrantsingh22/solana-security-dashboard-by-vikrant .
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the dashboard.

---

## 📁 Folder Structure

- `Real-time-exploits-tracker/` – Backend server folder with scraper (Node.js + Puppeteer) and Dockerfile.
- Deploy it on a hosting services such as aws/gcp/render using the attached `Dockerfile`.

- It is live at **[https://solana-exploits-tracker.onrender.com/scrape](https://solana-exploits-tracker.onrender.com/scrape)**

---

## Solana Security Dashboard

- `src/app/dashboard/page.tsx` – Main dashboard page with exploit data rendering logic.
- `src/components/` - Components for the app pages.
- `src/lib/dune-api.ts` – API helpers to fetch data from Dune queries.
- `data/manual/exploit_data/exploits.json` – Local data for historical exploits and also used for the open source contribution.
- `data/manual/resources/resources.json` – Local data for developer resources and also used for the open source contribution.
- `Real-time-exploits-tracker/` – Backend server folder with scraper (Node.js + Puppeteer) and Dockerfile.

---

## 🧠 Functionality Overview

### 📊 Dashboard

- The dashboard retrieves data from a custom backend endpoint:  
  **[https://solana-exploits-tracker.onrender.com/scrape](https://solana-exploits-tracker.onrender.com/scrape)**
- It compares API response timestamps against local `exploits.json` data and selects the latest.
- Uses `useEffect` to fetch the data and fall back gracefully if the API fails.
- When we make the open source contribution by updating the `data/manual/exploit_data/exploits.json` it checks if the exploits.json is recent and if it is recent it considers it.

```ts
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
```

Image:
Timeline Graph and analytics:
![Alt text](/public/1.png)
Exploit History Table:
![Alt text](/public/2.png)
When clicking on the Project Name:
![Alt text](/public/3.png)

---

## 📚 Resources

- List of Solana security resources for developers

![Alt text](/public/4.png)

![Alt text](/public/5.png)

Apply Filters to retrieve Resources:
![Alt text](/public/6.png)

## 📊 Analytics

- Exploit Analytics Dashboard
- Summary:
  - **Total Funds Lost:** `formatted currency`
  - **Funds Recovered:** `formatted currency`
  - **Active Scams:** `number`
- Charts:
  - Project-wise losses & recovery
  - Exploit type distribution
  - Exploit timeline

![Alt text](/public/7.png)
![Alt text](/public/8.png)
Time Line Graph:

![Alt text](/public/9.png)

Exploits Table:
![Alt text](/public/10.png)

### 💥 Exploits

- Filterable table of exploit events

![Alt text](/public/11.png)

Filters:
![Alt text](/public/12.png)

---

## 🔍 On-Chain Analytics

Powered by [Dune Analytics](https://dune.com/), the app fetches:

Real Time OnChain Analytics Retrieval:

![Alt text](/public/13.png)

File: `src/lib/api-dune.ts`

### 1. **Failed Transactions on Solana Chain**

Dune Query ID: `3537204`

```ts
fetchFailedTransactions() {
  // Makes API call to fetch failed transactions
}
```

Failed Transactions On Solana:
![Alt text](/public/14.png)
![Alt text](/public/15.png)
Graphical Representation of failed Transaction:
![Alt text](/public/16.png)
Tabular representation of failed Transactions:
![Alt text](/public/17.png)

### 2. **High-Frequency Signers**

Dune Query ID: `5065871`

```ts
fetchHighFrequencySigners() {
  // Retrieves wallets with suspiciously high tx count in 24 hours
}
```

Paginated Tabular Representation Of High Frequency Signer:
![Alt text](/public/18.png)
![Alt text](/public/19.png)

> 🔑 You must create and add a Dune API key to `.env` as:

```env
NEXT_PUBLIC_DUNE_API_KEY=your_api_key_here
```

---

## 🔧 Backend Server

- Folder: `Real-time-exploits-tracker`
- Contains a Puppeteer-powered scraper to fetch and structure exploit data from the [Rekt Database](https://rekt.news).
- Includes:
  - `Dockerfile` – Installs Puppeteer dependencies for Linux.
  - `index.js` – Entry point for the backend.
  - `package.json`

**Live Backend Exploits URL**:  
👉 [https://solana-exploits-tracker.onrender.com/scrape](https://solana-exploits-tracker.onrender.com/scrape)

---

## 📦 Deployment

### 🟣 Frontend (Next.js)

- Deeployed via Vercle at **[https://solanasecurity-dashboard-by-vikrant.vercel.app/dashboard](https://solanasecurity-dashboard-by-vikrant.vercel.app/dashboard)**.

### 🔵 Backend (Node + Puppeteer)

Use any Node-compatible platform. Currently deployed on Render at [https://solana-exploits-tracker.onrender.com/scrape](https://solana-exploits-tracker.onrender.com/scrape) .

---

## 📚 Contact Me:

- Email : vikrantsingh202004@gmail.com
- Telegram: https://t.me/Vikrant22dev

---

## 📌 Notes

- Ensure you have a Dune API key before using the analytics dashboard.

---
