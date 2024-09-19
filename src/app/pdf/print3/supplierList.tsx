import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import LotFilter from "./lotFilter";

const SupplierList = ({ data, srNo }) => {
  const allTotalOtherChargeFromData = data.map((item) => {
    return parseFloat(item.otherChargeTotal);
  });

  const uniqueSupplier = [
    ...new Set(data.map((item) => item.supplierName)),
  ] as any;

  const uniqueFarmer = [...new Set(data.map((item) => item.farmerName))] as any;
  // console.log("uniqueFarmer", uniqueFarmer);
  const uniqueItem = [...new Set(data.map((item) => item.itemName))] as any;
  const uniqueVlcNo = [...new Set(data.map((item) => item.vclNo))] as any;
  const uniqueDate = [...new Set(data.map((item) => item.date))] as any;
  const totalBasicAmount = data.reduce((accumulator, currentValue) => {
    return accumulator + parseFloat(currentValue.bikariAmount);
  }, 0);
  const totalOtherCharge = data.reduce((accumulator, currentValue) => {
    return accumulator + parseFloat(currentValue.otherChargeTotal);
  }, 0);
  const totalFreight = data.reduce((accumulator, currentValue) => {
    return accumulator + parseFloat(currentValue.freightTotal);
  }, 0);
  const totalLabourRate = data.reduce((accumulator, currentValue) => {
    return accumulator + parseFloat(currentValue.labourTotal);
  }, 0);

  const totalCharge = totalOtherCharge + totalFreight + totalLabourRate;
  // console.log("totalCharge" , totalCharge)
  // console.log("totalOtherCharge", totalOtherCharge);
  const totalAmount = totalBasicAmount - totalCharge;

  const totalSNug = data.reduce((accumulator, currentValue) => {
    return accumulator + parseFloat(currentValue.sNug);
  }, 0);
  const totalAvgWeight = data.reduce((accumulator, currentValue) => {
    return accumulator + parseFloat(currentValue.avgWeight);
  }, 0);
  const dateObject = new Date(uniqueDate[0]);
  const day = dateObject.getUTCDate();
  const month = dateObject.getUTCMonth() + 1; // Months are zero-based
  const year = dateObject.getUTCFullYear();
  // console.log("otherCharge", totalOtherCharge);

  const formattedDate = `${day}/${month}/${year}`;
  return (
    <div className="flex px-10 py-2 justify-center w-[794px]">
      <Table className="border-2 border-black ">
        <TableBody>
          <TableRow className="border-b-black">
            <TableCell
              colSpan={4}
              className="border-r-[1px] pl-12 border-r-black"
            >
              <div className="text-base font-bold">{uniqueSupplier[0]}</div>
              <div>{uniqueFarmer[0]}</div>
              <div>{uniqueItem[0]}</div>
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div>{srNo + 1}</div>
              <div>{formattedDate}</div>
              <div>{uniqueVlcNo[0]}</div>
            </TableCell>
          </TableRow>
          {uniqueFarmer.map((fName: string) => {
            const farmerNameFilter = data.filter(
              (item) => item.farmerName === fName,
            );
            return <LotFilter key={fName} data={farmerNameFilter} />;
          })}
          <TableRow className="border-2 border-black text-base font-bold">
            <td></td>
            <td></td>
            <td className="text-end">{totalSNug}</td>
            <td className="text-end">{totalAvgWeight}</td>
            <td></td>
            <td className="font-bold">Basic Amt</td>
            <td className="text-end font-bold pr-2">
              {parseFloat(totalBasicAmount).toFixed(2)}
            </td>
          </TableRow>
          <TableRow className="border-0 font-bold">
            <td className="text-end" colSpan={2}>
              Other Charge
            </td>
            <td className="text-end">
              {parseFloat(totalOtherCharge).toFixed(2)}
            </td>
            <td></td>
            <td></td>
            <td className="font-bold text-base">Exp.</td>
            <td className="text-end pr-2 font-bold text-base">
              {parseFloat(totalCharge).toFixed(2)}
            </td>
          </TableRow>
          <TableRow className="border-0 font-bold">
            <td></td>
            <td className="text-end">Freight</td>
            <td className="text-end">{parseFloat(totalFreight).toFixed(2)}</td>
            <td></td>
            <td></td>
            <td>R/F</td>
            <td className="text-end pr-2">
              {
                -(
                  parseFloat(totalAmount.toFixed(2)) -
                  Math.round(parseFloat(totalAmount.toFixed(2)) / 5) * 5
                ).toFixed(2)
              }
            </td>
          </TableRow>
          <TableRow className="font-bold">
            <td></td>
            <td className="text-end">Labour</td>
            <td className="text-end">
              {parseFloat(totalLabourRate).toFixed(2)}
            </td>
            <td></td>
            <td colSpan={2} className="font-bold text-base text-end">
              Net Amount
            </td>
            <td className="border-y border-black font-bold text-base text-end pr-2">
              {(Math.round(parseFloat(totalAmount.toFixed(2)) / 5) * 5).toFixed(
                2,
              )}
            </td>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default SupplierList;
