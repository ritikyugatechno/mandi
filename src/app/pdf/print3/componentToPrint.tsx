'use client'
import React, { forwardRef } from 'react';
import { useFetchPdf } from './query';
interface ComponentToPrintProps {}

const ComponentToPrint = forwardRef<HTMLDivElement, ComponentToPrintProps>((props, ref) => {
  return (
    <div key={'ComponentToPrint3'} ref={ref}>My cool content here!</div>
  );
});

ComponentToPrint.displayName = 'ComponentToPrint3'

export default ComponentToPrint;
