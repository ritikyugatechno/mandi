const SaleNugMerge = ({ data }) => {

const mergedData = Object.values(data.reduce((acc, currentValue) => {
    if (!acc[currentValue.sRate]) {
        acc[currentValue.sRate] = {sRate:currentValue.sRate,sNug:0,avgWeight:0} ;
    }
    acc[currentValue.sRate].itemName = currentValue.itemName;
    acc[currentValue.sRate].farmerName = currentValue.farmerName;
    acc[currentValue.sRate].lot = currentValue.lot;
    acc[currentValue.sRate].sNug += currentValue.sNug;
    acc[currentValue.sRate].avgWeight += currentValue.avgWeight;
    acc[currentValue.sRate].supplierRate = currentValue.supplierRate;
    acc[currentValue.sRate].bikariAmount = currentValue.bikariAmount;

    return acc;
}, {}));


    return (
        <>
            {
                mergedData.map((item) => {
                    return (
                        <>
                            <td>{item.itemName}</td>
                            <td>{item.farmerName}</td>
                            <td>{item.lot}</td>
                            <td>{item.sNug}</td>
                            <td>{item.avgWeight}</td>
                            <td>{item.supplierRate}</td>
                            <td>{item.bikariAmount / item.sNug}</td>
                            <td>{item.bikariAmount}</td>
                        </>
                    );
                })
            }
        </>
    )
}

export default SaleNugMerge