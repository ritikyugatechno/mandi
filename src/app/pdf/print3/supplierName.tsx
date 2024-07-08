import { useAppSelector } from "../hooks";
import SupplierList from "./supplierList";

const SupplierName = ({ data }) => {
  const firstStartPoint = useAppSelector(
    (state) => state.print3Slice.firstStartPoint
  );
  const uniqueSupplier = [...new Set(data.map((item) => item.supplierName))];
  const uniqueFarmer = [...new Set(data.map((item) => item.farmerName))];
  // const allTotalOtherChargeFromData = data.map((item) => {
  //   return parseFloat(item.otherChargeTotal);
  // });

  // Calculate total other charge once
  const totalOtherCharge = data.reduce((accumulator, currentValue) => {
    return accumulator + parseFloat(currentValue.otherChargeTotal);
  }, 0);

  // console.log("allTotalOtherChargeFromData", allTotalOtherChargeFromData);

  return (
    <div>
      <div className="text-center">श्री गणेशाय नमः।</div>
      <div className="">
        {uniqueFarmer.map((fName: string, index: number) => {
          const supplierNameFilter = data.filter(
            (item) => item.farmerName === fName
          );
          return (
            <>
              <div key={fName}>
                <SupplierList
                  data={supplierNameFilter}
                  srNo={firstStartPoint + index - 1}
                />
              </div>
            </>
          );
        })}
      </div>
      <div className="">
        <div>Total Other Charge: {totalOtherCharge}</div>
        
      </div>
    </div>
  );
};

export default SupplierName;
