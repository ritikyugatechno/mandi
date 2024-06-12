// src/pages/pdf/index.tsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { useDataContext } from "../../context/DataContext";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderBottomWidth: 1,
    borderRightWidth: 1,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
});

interface TablePDFProps {
  data: any[]; // Replace 'any' with your data type
}

const TablePDF: React.FC<TablePDFProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Serial Number</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Supplier Name</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Farmer Name</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Item Name</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>CNUG</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Customer Name</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Type Item</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>VCL No</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Freight Rate</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Other Charge</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Labour Rate</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Weight</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Avg Weight</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Seller Name</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Customer Value</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>S.Nug</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>{row.netWeight}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>{row.grossWeight}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>{row.cut}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>{row.date}</Text>
          </View>
          {/* Add more headers as needed */}
        </View>
        {/* Table Data */}
        {data.map((row) => (
          <View style={styles.tableRow} key={row.id}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{row.serialNo}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{row.supplierName}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{row.farmerName}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{row.itemName}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{row.cnug}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{row.customerName}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{row.typeItem}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{row.vclNo}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{row.freightRate}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{row.otherCharge}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{row.labourRate}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{row.weight}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{row.avgWeight}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{row.sellerName}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{row.customerValue}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{row.sNug}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{row.netWeight}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{row.grossWeight}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{row.cut}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{row.date}</Text>
            </View>
            {/* Add more cells as needed */}
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const PdfPage: React.FC = () => {
  const { data } = useDataContext();

  return (
    <div className="container mx-auto py-10">
      <PDFViewer style={{ width: "100%", height: "90vh" }}>
        <TablePDF data={data} />
      </PDFViewer>
    </div>
  );
};

export default PdfPage;
