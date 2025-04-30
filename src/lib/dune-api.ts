import axios from 'axios';

interface DuneApiResponse<T> {
  result: {
    rows: T[];
    metadata: {
      column_names: string[];
      result_set_bytes: number;
      total_row_count: number;
      datapoint_count: number;
      pending_time_millis: number;
      execution_time_millis: number;
    };
  };
}

interface FailedTransaction {
  day: string;
  total_failed: number;
  failed_rate: number;
}

interface HighFrequencySigner {
  signer: string;
  tx_count: number;
  first_tx: string;
  last_tx: string;
}

const DUNE_API_KEY = process.env.NEXT_PUBLIC_DUNE_API_KEY;
const DUNE_API_BASE_URL = 'https://api.dune.com/api/v1';

export async function fetchFailedTransactions(): Promise<FailedTransaction[]> {
  try {
    const response = await axios.get<DuneApiResponse<FailedTransaction>>(
      `${DUNE_API_BASE_URL}/query/3537204/results`,
      {
        headers: {
          'X-Dune-API-Key': DUNE_API_KEY,
        },
        params: {
          limit: 1000,
        },
      }
    );
    return response.data.result.rows;
  } catch (error) {
    console.error('Error fetching failed transactions:', error);
    throw error;
  }
}

export async function fetchHighFrequencySigners(): Promise<HighFrequencySigner[]> {
  try {
    const response = await axios.get<DuneApiResponse<HighFrequencySigner>>(
      `${DUNE_API_BASE_URL}/query/5065871/results`,
      {
        headers: {
          'X-Dune-API-Key': DUNE_API_KEY,
        },
        params: {
          limit: 1000,
        },
      }
    );
    return response.data.result.rows;
  } catch (error) {
    console.error('Error fetching high frequency signers:', error);
    throw error;
  }
} 