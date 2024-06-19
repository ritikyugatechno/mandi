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
  const [data, isLoading, isError, refetch] = useFetchPdf();
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {isError} </p>;
  // const showData = data.data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {/* <Text style={styles.heading}>Supplier Names</Text> */}
          
        </View>
        <View style={styles.section}></View>
      </Page>
    </Document>
  );
};

export default PdfDocument;
