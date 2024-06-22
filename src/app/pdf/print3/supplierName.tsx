import { useAppSelector } from "../hooks";
import SupplierList from "./supplierList";

const SupplierName = ({ data }) => {
    const firstStartPoint = useAppSelector((state) => state.print3Slice.firstStartPoint)
    const uniqueSupplier = [
        ...new Set(data.map((item) => item.supplierName)),
    ];
    return (
        <div>
            <div className="text-center">श्री गणेशाय नमः।</div>
            <div className="">
                {
                    uniqueSupplier.map((sName:string, index:number) => {
                        const supplierNameFilter = data.filter(
                            (item) => item.supplierName === sName
                        );
                        return (
                            <>
                                <div key={sName}>
                                    <SupplierList data={supplierNameFilter} srNo={firstStartPoint + index - 1} />
                                </div>
                            </>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default SupplierName