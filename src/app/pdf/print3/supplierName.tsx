import { useAppSelector } from "../hooks";
import SupplierList from "./supplierList";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const SupplierName = ({ data }) => {
  const firstStartPoint = useAppSelector(
    (state) => state.print3Slice.firstStartPoint,
  );

  const uniqueFarmer = [...new Set(data.map((item) => item.farmerName))];

  const allOtherChargeTotal = data.reduce((accumulator, currentValue) => {
    return accumulator + parseFloat(currentValue.otherChargeTotal);
  }, 0);
  const allOtherChargeTotalFixed = parseFloat(allOtherChargeTotal.toFixed(2));

  const allFreightTotal = data.reduce((accumulator, currentValue) => {
    return accumulator + parseFloat(currentValue.freightTotal);
  }, 0);
  const allFreightTotalFixed = parseFloat(allFreightTotal.toFixed(2));

  const allLabourTotal = data.reduce((accumulator, currentValue) => {
    return accumulator + parseFloat(currentValue.labourTotal);
  }, 0);
  const allLabourTotalFixed = parseFloat(allLabourTotal.toFixed(2));

  const totalExpense = allOtherChargeTotal + allFreightTotal + allLabourTotal;
  const totalExpenseFixed = parseFloat(totalExpense.toFixed(2));

  const totalBikariAmount = data.reduce((accumulator, currentValue) => {
    return accumulator + parseFloat(currentValue.bikariAmount);
  }, 0);
  const totalBikariAmountFixed = parseFloat(totalBikariAmount.toFixed(2));

  const totalNetAmount = totalBikariAmountFixed - totalExpenseFixed;

  return (
    <div className="">
      <div className="text-center">श्री गणेशाय नमः।</div>
      {uniqueFarmer.map((fName, index) => {
        const supplierNameFilter = data.filter(
          (item) => item.farmerName === fName,
        );
        return (
          <div key={`${fName}-${index}`}>
            <SupplierList
              data={supplierNameFilter}
              srNo={firstStartPoint + index - 1}
            />
          </div>
        );
      })}
      <div className="flex justify-center w-full mt-4">
        <Table className="border-2 border-black w-[794px]">
          <TableBody>
            <TableRow className="border-b-black">
              <TableCell
                colSpan={4}
                className="text-center border-r-[1px] border-r-black"
              >
                Total Other Charge: {allOtherChargeTotalFixed}
              </TableCell>
              <TableCell colSpan={4} className="text-center">
                Total Bikari Amount: {totalBikariAmountFixed}
              </TableCell>
            </TableRow>
            <TableRow className="border-b-black">
              <TableCell
                colSpan={4}
                className="text-center border-r-[1px] border-r-black"
              >
                Total Labour: {allLabourTotalFixed}
              </TableCell>
              <TableCell
                colSpan={4}
                className="text-center border-r-[1px] border-r-black"
              >
                Total Expense: {totalExpenseFixed}
              </TableCell>
            </TableRow>
            <TableRow className="border-b-black">
              <TableCell
                colSpan={4}
                className="text-center border-r-[1px] border-r-black"
              >
                Total Freight: {allFreightTotalFixed}
              </TableCell>
              <TableCell
                colSpan={4}
                className="text-center border-r-[1px] border-r-black"
              >
                Net Amount: {totalNetAmount}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SupplierName;
