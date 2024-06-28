import { TableRow } from "@/components/ui/table";

const SaleNugMerge = ({ data }) => {

const mergedData = Object.values(data.reduce((acc, currentValue) => {
    if (!acc[currentValue.sRate]) {
        acc[currentValue.sRate] = {sRate:currentValue.sRate,sNug:0,avgWeight:0,bikariAmount:0} ;
    }
    acc[currentValue.sRate].itemName = currentValue.itemName;
    acc[currentValue.sRate].farmerName = currentValue.farmerName;
    acc[currentValue.sRate].lot = currentValue.lot;
    acc[currentValue.sRate].sNug += currentValue.sNug;
    acc[currentValue.sRate].avgWeight += currentValue.avgWeight;
    acc[currentValue.sRate].supplierRate = currentValue.supplierRate;
    console.log("new bikariAmount", acc[currentValue.sRate].bikariAmount)
    acc[currentValue.sRate].bikariAmount += parseFloat(currentValue.bikariAmount);
    console.log("bikariAmount" , currentValue.bikariAmount)
    return acc;
}, {}));


    return (
        <>
            {
                mergedData.map((item: any) => {
                    return (
                        <>
                    <TableRow className="border-black border" >
                            <td className="w-40"></td>
                            <td className="pl-6 w-20">{item.lot}</td>
                            <td className="text-end w-20">{item.sNug}</td>
                            <td className="text-end w-20">{item.avgWeight}</td>
                            <td className=" text-end w-20">{parseFloat(item.supplierRate).toFixed(2)}</td>
                            <td className="text-end w-20">{(item.bikariAmount / item.sNug).toFixed(2)}</td>
                            <td className="text-end w-20 pr-2">{parseFloat(item.bikariAmount).toFixed(2)}</td>
                    </TableRow>
                        </>
                    );
                })
            }
        </>
    )
}

export default SaleNugMerge