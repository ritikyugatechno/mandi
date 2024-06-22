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
                    return (
                        <div key={fName}>
                            <div>fName: {fName}</div>
                            <CustomerName data={farmerNameFilter} />
                        </div>
                    );
                })
            }
        </div>
    )
}

export default FarmerName