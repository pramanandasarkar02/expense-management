'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

/* ========= API TYPES ========= */
type ChartAPI = {
  monthId: string;
  fields: Record<string, number>;
};

/* ========= UI TYPES ========= */
type Field = {
  title: string;
  value: number;
};

type Chart = {
  monthId: string;
  fields: Field[];
};

const Report = () => {
  const rootURL = 'http://localhost:8080/api';

  const accountId = typeof window !== 'undefined' ? localStorage.getItem('accountId') : null;

  const [reports, setReports] = useState<Chart[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getReports = async () => {
      if (!accountId) {
        setError('Account ID not found');
        return;
      }

      setLoading(true);
      setError('');

      try {
        const res = await axios.get<ChartAPI[]>(`${rootURL}/accounts/${accountId}/reports`);
        const data = await res.data;
        console.log(data);

        const transformed: Chart[] = res.data.map((item) => ({
          monthId: item.monthId,
          fields: Object.entries(item.fields ?? {}).map(([key, value]) => ({
            title: key,
            value: value,
          })),
        }));

        // optional: sort months (YYYY-MM)
        transformed.sort((a, b) => a.monthId.localeCompare(b.monthId));

        setReports(transformed);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch reports');
      } finally {
        setLoading(false);
      }
    };
    getReports();
  }, []);

  /* ========= UI ========= */
  return (
    <div className="max-w-3xl mx-auto p-5">
      <h2 className="text-xl font-semibold mb-6">Monthly Expense Report</h2>

      {loading && <p>Loading reports...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && reports.length === 0 && <p>No reports available</p>}

      <div className="space-y-5">
        {reports.map((chart) => {
          const total = chart.fields.reduce((sum, f) => sum + f.value, 0);

          return (
            <div key={chart.monthId} className="border border-gray-200 rounded-lg bg-gray-50 p-5">
              {/* Month ID */}
              <h3 className="text-center font-semibold mb-4">{chart.monthId}</h3>

              {chart.fields.length === 0 ? (
                <p className="text-center text-gray-500">No expenses recorded</p>
              ) : (
                <>
                  {/* Expense rows */}
                  <div className="space-y-2">
                    {chart.fields.map((field) => (
                      <div key={field.title} className="flex items-center text-sm">
                        {/* Left: title */}
                        <div className="min-w-[120px]">{field.title}</div>

                        {/* Dotted line */}
                        <div className="flex-1 border-b border-dotted border-gray-400 mx-3" />

                        {/* Right: amount */}
                        <div className="min-w-[80px] text-right">{field.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="flex items-center mt-4 pt-3 border-t border-gray-200 font-semibold">
                    <div>Total</div>
                    <div className="flex-1 mx-3" />
                    <div className="text-right">{total}</div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Report;
