import VclList from "./vclList";

const VclNoFilter = ({ data }) => {
    const uniqueVclNo = [
        ...new Set(data.map((item) => item.vclNo)),
    ];
    return (
        <div>
            <div className="text-center">श्री गणेशाय नमः।</div>
            <div className="flex flex-wrap justify-end gap-10 pr-10">

            {
                uniqueVclNo.map((vclNo : string) => {
                    const vclNoFilter = data.filter(
                        (item) => item.vclNo === vclNo
                    );
                    return (
                        <div key={vclNo} className="border-2 border-black  w-[600px]">
                            <div className="flex justify-between border-b-2 border-black">
                                <span className="font-bold pl-4">{vclNoFilter[0].itemName}</span>
                                <span className="font-bold pr-4">{vclNo}</span>
                            </div>
                            <VclList data={vclNoFilter} />
                        </div>
                    );
                })
            }

            </div>
        </div>
    )
}

export default VclNoFilter
/*


            */