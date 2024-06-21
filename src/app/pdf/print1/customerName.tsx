const CustomerName = ({ data }) => {
    // const uniqueCustomer = [
    //     ...new Set(data.map((item) => item.customerName)),
    // ];
    return (
        <div>
            {
                data.map((item) => {
                    return (
                        <div key={item.customerName} className="border w-96">
                            <div className="flex justify-between">
                                <span>{item.lot}</span>
                                <span>{item.typeItem}</span>
                                </div>
                            <div className="flex justify-between">
                                <span>{item.cNug}</span>
                                <span>{item.customerName}</span>
                                <span>{item.weight}</span>
                                </div>

                        </div>
                    );
                })
            }
        </div>
    )
}

export default CustomerName