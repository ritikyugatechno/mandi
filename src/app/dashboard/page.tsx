"use client";
import { useDispatch, useSelector } from "react-redux";
import { columns } from "./column";
import { DataTable } from "./data-table";
import { useFetchSale } from "./query";
import { addData } from "./dataSlice";

const GetDataPage = () => {
  const { data, isLoading, isError } = useFetchSale();
  const dispatch = useDispatch();
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {isError} </p>;
  // const hello = useSelector(state => state.datas)

  const handleInput = (e) => {
    console.log(e.target.value)
    dispatch(addData('hello'))
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
      <input type="text" onChange={handleInput} />
      {/* <div>{hello}</div> */}
    </div>
  );
};

export default GetDataPage;
