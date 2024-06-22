import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import FarmerList from "./farmerList";

const SupplierList = ({ data, srNo }) => {
    const uniqueSupplier = [
        ...new Set(data.map((item) => item.supplierName)),
    ] as any;
    const uniqueFarmer = [
        ...new Set(data.map((item) => item.farmerName)),
    ];
    const uniqueVlcNo = [
        ...new Set(data.map((item) => item.vclNo)),
    ] as any
    const uniqueDate = [
        ...new Set(data.map((item) => item.date)),
    ] as any;
    const totalBasicAmount = data.reduce((accumulator, currentValue) => {
        return accumulator + parseFloat(currentValue.basicAmount)
    }, 0)
    const totalOtherCharge = data.reduce((accumulator, currentValue) => {
        return accumulator + parseFloat(currentValue.otherChargeTotal)
    }, 0)
    const totalFreight = data.reduce((accumulator, currentValue) => {
        return accumulator + parseFloat(currentValue.freightTotal)
    }, 0)
    const totalLabourRate = data.reduce((accumulator, currentValue) => {
        return accumulator + parseFloat(currentValue.labourTotal)
    }, 0)
    const totalCharge = totalOtherCharge + totalFreight + totalLabourRate
    const totalAmount = totalBasicAmount - totalCharge;

    const totalSNug = data.reduce((accumulator, currentValue) => {
        return accumulator + parseFloat(currentValue.sNug)
    }, 0)
    const totalAvgWeight = data.reduce((accumulator, currentValue) => {
        return accumulator + parseFloat(currentValue.avgWeight)
    }, 0)
    const dateObject = new Date(uniqueDate[0])
    const day = dateObject.getUTCDate();
    const month = dateObject.getUTCMonth() + 1; // Months are zero-based
    const year = dateObject.getUTCFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return (
        <div className="flex px-10 justify-center">
            <Table className="">
                <TableBody>
                    <TableRow >
                        <TableCell>{uniqueSupplier[0]}</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell className="text-right" colSpan={3}>
                            <div>{srNo + 1}</div>
                            <div>{formattedDate}</div>
                            <div>{uniqueVlcNo[0]}</div>
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                        {
                            uniqueFarmer.map((fName: string) => {
                                const farmerNameFilter = data.filter(
                                    (item) => item.farmerName === fName
                                );
                                return (
                                    <FarmerList key={fName} data={farmerNameFilter} />
                                );
                            })
                        }
                    <TableRow className="">
                        <td></td>
                        <td></td>
                        <td>{totalSNug}</td>
                        <td>{totalAvgWeight}</td>
                        <td></td>
                        <td></td>
                        <td>{totalBasicAmount}</td>
                    </TableRow>
                    <TableRow className="border-0">
                        <td></td>
                        <td></td>
                        <td>{parseFloat(totalOtherCharge).toFixed(2)}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{parseFloat(totalCharge).toFixed(2)}</td>
                    </TableRow>
                    <TableRow className="border-0">
                        <td></td>
                        <td></td>
                        <td>{totalFreight}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{totalAmount.toFixed(2)}</td>
                    </TableRow>
                    <TableRow>
                        <td></td>
                        <td></td>
                        <td>{totalLabourRate}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default SupplierList