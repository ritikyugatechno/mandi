'use client'
import React, { forwardRef } from 'react';
import { useFetchPdf } from './query';
interface ComponentToPrintProps {}

const ComponentToPrint = forwardRef<HTMLDivElement, ComponentToPrintProps>((props, ref) => {
  return (
    <div ref={ref}>My cool content here!</div>
  );
});

export default ComponentToPrint;
