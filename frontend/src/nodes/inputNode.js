// inputNode.js — refactored to use BaseNode abstraction

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

const INPUT_CONFIG = {
  title: 'Input',
  icon: '📥',
  color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  inputs: [],
  outputs: [{ id: 'value', label: 'value' }],
  fields: [
    {
      type: 'text',
      name: 'inputName',
      label: 'Name',
      placeholder: 'input_name',
    },
    {
      type: 'select',
      name: 'inputType',
      label: 'Type',
      options: ['Text', 'File', 'Image', 'Number'],
      defaultValue: 'Text',
    },
  ],
};

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);

  const [localData, setLocalData] = useState({
    inputName: data?.inputName || id.replace('customInput-', 'input_'),
    inputType: data?.inputType || 'Text',
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
      config={INPUT_CONFIG}
      onFieldChange={handleFieldChange}
    />
  );
};
