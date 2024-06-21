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
            <Table>
                <TableBody className="p-0">
                    {
                        data.map((item) => {
                            return (
                                <>
                                    <TableRow className="p-0">
                                        <TableCell className="p-0">{item.basicAmount}</TableCell>
                                        <TableCell className="p-0">{item.customerName}</TableCell>
                                        <TableCell className="p-0">{item.cNug}</TableCell>
                                        <TableCell className="p-0">{item.netWeight}</TableCell>
                                        <TableCell className="p-0">{item.customerRate}</TableCell>
                                    </TableRow>
                                </>
                            );
                        })
                    }
                    <TableRow className="p-0">
                        <TableCell className="p-0">{totalBasicAmount}</TableCell>
                        <TableCell className="p-0">Totol</TableCell>
                        <TableCell className="p-0">{totalCNug}</TableCell>
                        <TableCell className="p-0">{totalNetWeight}</TableCell>
                        <TableCell className="p-0"></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default VclList