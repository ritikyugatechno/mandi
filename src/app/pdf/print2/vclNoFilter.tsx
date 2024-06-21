import VclList from "./vclList";

const VclNoFilter = ({ data }) => {
    const uniqueVclNo = [
        ...new Set(data.map((item) => item.vclNo)),
    ];
    return (
        <div>
            <div className="text-center">श्री गणेशाय नमः।</div>
            {
                uniqueVclNo.map((vclNo) => {
                    const vclNoFilter = data.filter(
                        (item) => item.vclNo === vclNo
                    );
                    return (
                        <div key={vclNo} className="border w-96">
                            <div className="flex justify-between">
                                <span>{vclNoFilter.map((item)=>(<>{item.itemName}</>))}</span>
                                <span>{vclNo}</span>
                            </div>
                            <VclList data={vclNoFilter} />
                        </div>
                    );
                })
            }
        </div>
    )
}

export default VclNoFilter