import SRateFilter from "./sRateFilter";

const LotFilter = ({ data }) => {
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
                        <SRateFilter data={lotFilter} />
                        </>
                    );
                })
            }
        </>
    )
}

export default LotFilter