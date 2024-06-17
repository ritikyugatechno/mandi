"use client";
import React, { useEffect, useState } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
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
  heading: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  column: {
    flexDirection: "column",
    flex: 1,
    margin: 5,
  },
});

// Create Document Component
const PdfDocument = () => {
  const [showData, setShowData] = useState([]);

  useEffect(() => {
    fetch("/api/dashboard/get-data-by-date")
      .then((response) => response.json())
      .then((data) => {
        console.log("useEffect", data);
        setShowData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {/* <Text style={styles.heading}>Supplier Names</Text> */}
          {showData.map((data, index) => (
            <Text key={index} style={styles.text}>
              {data.supplierName[0]}
            </Text>
          ))}
        </View>
        <View style={styles.section}>
          {/* <Text style={styles.heading}>Farmer Names</Text> */}
          {showData.map((data, index) => (
            <Text key={index} style={styles.text}>
              {data.farmerName[0]}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PdfDocument;
