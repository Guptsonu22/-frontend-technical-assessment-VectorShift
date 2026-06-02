// outputNode.js — refactored to use BaseNode abstraction

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

const OUTPUT_CONFIG = {
  title: 'Output',
  icon: '📤',
  color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  inputs: [{ id: 'value', label: 'value' }],
  outputs: [],
  fields: [
    {
      type: 'text',
      name: 'outputName',
      label: 'Name',
      placeholder: 'output_name',
    },
    {
      type: 'select',
      name: 'outputType',
      label: 'Type',
      options: ['Text', 'Image', 'File', 'Number'],
      defaultValue: 'Text',
    },
  ],
};

export const OutputNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);

  const [localData, setLocalData] = useState({
    outputName: data?.outputName || id.replace('customOutput-', 'output_'),
    outputType: data?.outputType || 'Text',
  });

  const handleFieldChange = (fieldName, value) => {
    const updated = { ...localData, [fieldName]: value };
    setLocalData(updated);
    updateNodeField(id, fieldName, value);
  };

  return (
    <BaseNode
      id={id}
      data={localData}
      config={OUTPUT_CONFIG}
      onFieldChange={handleFieldChange}
    />
  );
};
