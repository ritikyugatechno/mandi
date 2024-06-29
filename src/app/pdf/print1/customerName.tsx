const CustomerName = ({ data }) => {
  // const uniqueCustomer = [
  //     ...new Set(data.map((item) => item.customerName)),
  // ];
  return (
    <div >
      {
        data.map((item) => {
          const weightArray = item.weight.split("+");
          return (
            <div key={item.customerName} className="border border-black px-2 w-96">
              <div className="flex justify-between">
                <span>{item.lot}</span>
                <span className="font-bold">{item.customerName}</span>
                <span>{item.typeItem}/ {item.cut}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">{item.sNug}</span>
                <span className="flex flex-wrap w-60 text-end justify-end">{weightArray.map((weight) => {
                  return (<div>{weight}, </div>)
                })}</span>
              </div>
              <div className="flex justify-between border-t-black border-t border-dashed">
                <span>
                  {item.grossWeight}
                </span>
                <span>
                  -
                </span>
                <span>
                  {item.cut * item.sNug}
                </span>
                <span>
                  =
                </span>
                <span>
                  {item.netWeight}
                </span>
              </div>
            </div>
          );
        })
      }
    </div>
  )
}

export default CustomerName
