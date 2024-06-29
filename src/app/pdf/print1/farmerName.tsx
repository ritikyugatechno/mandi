import CustomerName from "./customerName";

const FarmerName = ({ data }) => {
  const uniqueFarmer = [
    ...new Set(data.map((item) => item.farmerName)),
  ];
  return (
    <div>
      {
        uniqueFarmer.map((fName: string) => {
          const farmerNameFilter = data.filter(
            (item) => item.farmerName === fName
          );
          const totalSNug = data.reduce((accumulator, currentValue) => {
            return accumulator + parseFloat(currentValue.sNug)
          }, 0)
          return (
            <div key={fName}>
              <div className="font-bold flex justify-between">
                <span>
                  {fName}
                </span>
                <span>
                  {totalSNug}
                </span>
              </div>
              <CustomerName data={farmerNameFilter} />
            </div>
          );
        })
      }
    </div>
  )
}

export default FarmerName
