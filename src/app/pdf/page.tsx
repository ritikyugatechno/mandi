"use client";
import React, { useEffect, useState } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useFetchPdf } from "./query";

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
  const { data, isLoading, isError, refetch } = useFetchPdf();
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {isError} </p>;
  const showData = data;
  // console.log(showData);

  const allSupplierName = [];

  showData.reduce((acc: object, currentObj) => {
    if (currentObj.supplierName in acc) {
    } else {
      allSupplierName.push(currentObj.supplierName);
      acc[currentObj.supplierName] = 1;
    }
    return acc;
  });

  // console.log(allSupplierName);
  const superArray = [];

  const uniqueSupplier = [
    ...new Set(showData.map((item) => item.supplierName)),
  ];

  uniqueSupplier.map((sNane) => {
    const supplierNameFilter = showData.filter(
      (item) => item.supplierName === sNane
    );

    const uniqueFarmer = [
      ...new Set(supplierNameFilter.map((item) => item.farmerName)),
    ];

    uniqueFarmer.map((fName) => {
      const farmerNameFilter = supplierNameFilter.filter(
        (item) => item.farmerName === fName
      );

      const uniqueCustomer = [
        ...new Set(farmerNameFilter.map((item) => item.customerName)),
      ];

      uniqueCustomer.map((cName) => {
        const customerNameFilter = farmerNameFilter.filter(
          (item) => item.customerName === cName
        );
      });
    });
  });
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {uniqueSupplier.map((sNane) => {
            return <Text>{sNane}</Text>;
          })}
          <h1>Hello</h1>
        </View>
        <View style={styles.section}></View>
      </Page>
    </Document>
  );
};

export default PdfDocument;
