// src/pages/dashboard/index.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { columns } from "../../components/column";
import { DataTable } from "../../components/data-table";
import { useDataContext } from "../../context/DataContext";

interface SaleData {
  id: number;
  // Define other properties based on your data structure
}

const fetchData = async (): Promise<SaleData[]> => {
  const response = await fetch("/api/sale");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data, setData } = useDataContext();
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [setData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleViewPDF = () => {
    router.push("/pdf");
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
      <div className="mt-4">
        <button onClick={handleViewPDF} className="btn btn-primary">
          View PDF
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
