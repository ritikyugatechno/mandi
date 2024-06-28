import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

const VclList = ({ data }) => {
    const totalBasicAmount = data.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.basicAmount
    }, 0)
    const totalCNug = data.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.cNug
    }, 0)
    const totalNetWeight = data.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.netWeight
    }, 0)
    return (
        <div className="w-full">
            <Table className="">
                <TableBody className="p-0">
                    {
                        data.map((item) => {
                            return (
                                <>
                                    <TableRow className="p-0">
                                        <TableCell className="p-0 text-end pr-2">{parseFloat(item.basicAmount).toFixed(2)}</TableCell>
                                        <TableCell className="p-0">{item.customerName}</TableCell>
                                        <TableCell className="p-0 text-end">{item.cNug}</TableCell>
                                        <TableCell className="p-0 text-end">{item.netWeight}</TableCell>
                                        <TableCell className="p-0 text-end pr-4">{parseFloat(item.customerRate).toFixed(2)}</TableCell>
                                    </TableRow>
                                </>
                            );
                        })
                    }
                    <TableRow className="border-2 border-black"></TableRow>
                    <TableRow className="p-0 font-bold">
                        <TableCell className="p-0 text-end pr-2">{parseFloat(totalBasicAmount).toFixed(2)}</TableCell>
                        <TableCell className="p-0">Totol</TableCell>
                        <TableCell className="p-0 text-end">{totalCNug}</TableCell>
                        <TableCell className="p-0 text-end">{totalNetWeight}</TableCell>
                        <TableCell className="p-0"></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default VclList