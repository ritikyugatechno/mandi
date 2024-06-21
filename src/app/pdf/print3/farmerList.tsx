import SaleNugMerge from "./saleNugMerge";


const FarmerList = ({ data }) => {
    const uniqueLot = [
        ...new Set(data.map((item) => item.lot)),
    ];
    return (
        <>
            {
                uniqueLot.map((lot) => {
                    const lotFilter = data.filter(
                        (item) => item.lot === lot
                    );
                    return (
                        <>
                        <SaleNugMerge data={lotFilter} />
                        </>
                    );
                })
            }
        </>
    )
}

export default FarmerList