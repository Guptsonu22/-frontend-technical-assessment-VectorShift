// mathNode.js — Perform math operations on numeric inputs

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

const MATH_CONFIG = {
  title: 'Math',
  icon: '➕',
  color: 'linear-gradient(135deg, #1FA2FF 0%, #12D8FA 50%, #A6FFCB 100%)',
  inputs: [
    { id: 'a', label: 'A (left)',  style: { top: '35%' } },
    { id: 'b', label: 'B (right)', style: { top: '65%' } },
  ],
  outputs: [
    { id: 'result', label: 'result' },
  ],
  fields: [
    {
      type: 'select',
      name: 'operation',
      label: 'Operation',
      options: ['Add (+)', 'Subtract (−)', 'Multiply (×)', 'Divide (÷)', 'Modulo (%)', 'Power (^)'],
      defaultValue: 'Add (+)',
    },
    {
      type: 'number',
      name: 'operandB',
      label: 'Constant B (if not wired)',
      placeholder: '0',
      defaultValue: 0,
    },
  ],
};

export const MathNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);

  const [localData, setLocalData] = useState({
    operation: data?.operation || 'Add (+)',
    operandB:  data?.operandB  || 0,
  });

  const handleFieldChange = (fieldName, value) => {
    setLocalData((prev) => ({ ...prev, [fieldName]: value }));
    updateNodeField(id, fieldName, value);
  };

  return (
    <BaseNode
      id={id}
      data={localData}
      config={MATH_CONFIG}
      onFieldChange={handleFieldChange}
    />
  );
};
