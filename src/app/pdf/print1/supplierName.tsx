import FarmerName from "./farmerName";

const SupplierName = ({ data }) => {
    const uniqueSupplier = [
        ...new Set(data.map((item) => item.supplierName)),
    ];
    return (
        <div>
            <div className="text-center">श्री गणेशाय नमः।</div>
            <div className="flex flex-wrap gap-4">
                {
                    uniqueSupplier.map((sName: string) => {
                        const supplierNameFilter = data.filter(
                            (item) => item.supplierName === sName
                        );
                        return (
                            <>
                                <div key={sName}>
                                    <div> {sName}</div>
                                    <FarmerName data={supplierNameFilter} />
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