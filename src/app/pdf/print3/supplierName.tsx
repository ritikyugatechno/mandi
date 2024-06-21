import SupplierList from "./supplierList";

const SupplierName = ({ data }) => {
    const uniqueSupplier = [
        ...new Set(data.map((item) => item.supplierName)),
    ];
    return (
        <div>
            <div className="text-center">श्री गणेशाय नमः।</div>
            <div className="">
                {
                    uniqueSupplier.map((sName, index) => {
                        const supplierNameFilter = data.filter(
                            (item) => item.supplierName === sName
                        );
                        return (
                            <>
                                <div key={sName}>
                                    <SupplierList data={supplierNameFilter} srNo={index} />
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