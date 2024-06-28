'use client'
import React, { forwardRef } from 'react';
import { useFetchPdf } from './query';
interface ComponentToPrintProps {}

const ComponentToPrint = forwardRef<HTMLDivElement, ComponentToPrintProps>((props, ref) => {
  return (
    <div key={'ComponentToPrint2'} ref={ref}>My cool content here!</div>
  );
});

ComponentToPrint.displayName = 'ComponentToPrint2'

export default ComponentToPrint;
