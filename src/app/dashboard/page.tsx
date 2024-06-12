"use client";
import { useDispatch, useSelector } from "react-redux";
import { columns } from "./column";
import { DataTable } from "./data-table";
import { useFetchSale } from "./query";
import { addData } from "./dataSlice";
import { RootState } from "./store";

const GetDataPage = () => {
  const { data, isLoading, isError } = useFetchSale();
  const dispatch = useDispatch();
  const tableData = useSelector((state: RootState) => state.datas)
  const firstAdd = useSelector((state: RootState) => state.firstAdd)
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {isError} </p>;

  if (firstAdd) {
    dispatch(addData(data))
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={tableData} />
    </div>
  );
};

export default GetDataPage;
