import SaleNugMerge from "./saleNugMerge";

const SRateFilter = ({ data }) => {
    const uniqueSRate = [
        ...new Set(data.map((item) => item.supplierRate)),
    ];
    return (
        <>
            {
                uniqueSRate.map((sRate) => {
                    const sRateFilter = data.filter(
                        (item) => item.supplierRate === sRate
                    );
                    return (
                        <>
                        <SaleNugMerge data={sRateFilter} />
                        </>
                    );
                })
            }
        </>
    )
}

export default SRateFilter