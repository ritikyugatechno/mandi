import FarmerList from "./farmerList";

const SupplierList = ({ data , srNo}) => {
    const uniqueSupplier = [
        ...new Set(data.map((item) => item.supplierName)),
    ];
    const uniqueFarmer = [
        ...new Set(data.map((item) => item.farmerName)),
    ];
    const uniqueVlcNo = [
        ...new Set(data.map((item) => item.vclNo)),
    ]
    const uniqueDate = [
        ...new Set(data.map((item) => item.date)),
    ]
    const totalBasicAmount = data.reduce((accumulator,currentValue) => {
        return accumulator + parseFloat(currentValue.basicAmount)
    },0)
    const totalOtherCharge = data.reduce((accumulator,currentValue)=>{
        return accumulator + parseFloat(currentValue.otherChargeTotal)
    },0)
    const totalFreight = data.reduce((accumulator,currentValue)=>{
        return accumulator + parseFloat(currentValue.freightTotal)
    },0)
    const totalLabourRate = data.reduce((accumulator,currentValue)=>{
        return accumulator + parseFloat(currentValue.labourTotal)
    },0)
    const totalCharge = totalOtherCharge + totalFreight + totalLabourRate
    const totalAmount = totalBasicAmount - totalCharge;

    const totalSNug = data.reduce((accumulator,currentValue) => {
        return accumulator + parseFloat(currentValue.sNug)
    },0)
    const totalAvgWeight = data.reduce((accumulator,currentValue) => {
        return accumulator + parseFloat(currentValue.avgWeight)
    },0)
    const dateObject = new Date(uniqueDate[0])
    const day = dateObject.getUTCDate();
const month = dateObject.getUTCMonth() + 1; // Months are zero-based
const year = dateObject.getUTCFullYear();

const formattedDate = `${day}/${month}/${year}`;
    return (
        <div>
            <table>
            <tr className="border">
                <td>{uniqueSupplier[0]}</td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                    <div>{formattedDate}</div>
                    <div>{uniqueVlcNo[0]}</div>
                    <div>{srNo + 1}</div>
                </td>
            </tr>
            {
                uniqueFarmer.map((fName) => {
                    const farmerNameFilter = data.filter(
                        (item) => item.farmerName === fName
                    );
                    return (
                        <tr className="border">
                            <FarmerList data={farmerNameFilter} />
                        </tr>
                    );
                })
            }
            <tr>
                <td></td>
                <td></td>
                <td>{totalSNug}</td>
                <td>{totalAvgWeight}</td>
                <td></td>
                <td></td>
                <td>{totalBasicAmount}</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td>{totalOtherCharge}</td>
                <td></td>
                <td></td>
                <td></td>
                <td>{totalCharge}</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td>{totalFreight}</td>
                <td></td>
                <td></td>
                <td></td>
                <td>{totalAmount}</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td>{totalLabourRate}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            </table>
        </div>
    )
}

export default SupplierList