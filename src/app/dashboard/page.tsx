// src/app/getData/page.tsx
"use client";
import React, { useEffect, useState } from "react";

import { columns } from "./column";
import { DataTable } from "./data-table";


const fetchData = async () => {
  const response = await fetch("/api/sale");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};
const GetDataPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

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
    }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default GetDataPage;
