// filterNode.js — Filter/condition node: passes data only if condition is met

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

const FILTER_CONFIG = {
  title: 'Filter',
  icon: '🔍',
  color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)',
  inputs: [
    { id: 'data', label: 'data' },
  ],
  outputs: [
    { id: 'pass',   label: 'pass (true)'  },
    { id: 'reject', label: 'reject (false)' },
  ],
  fields: [
    {
      type: 'text',
      name: 'field',
      label: 'Field',
      placeholder: 'e.g. status',
    },
    {
      type: 'select',
      name: 'operator',
      label: 'Operator',
      options: ['==', '!=', '>', '<', '>=', '<=', 'contains', 'not contains'],
      defaultValue: '==',
    },
    {
      type: 'text',
      name: 'value',
      label: 'Value',
      placeholder: 'e.g. active',
    },
  ],
};

export const FilterNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);

  const [localData, setLocalData] = useState({
    field:    data?.field    || '',
    operator: data?.operator || '==',
    value:    data?.value    || '',
  });

  const handleFieldChange = (fieldName, value) => {
    setLocalData((prev) => ({ ...prev, [fieldName]: value }));
    updateNodeField(id, fieldName, value);
  };

  return (
    <BaseNode
      id={id}
      data={localData}
      config={FILTER_CONFIG}
      onFieldChange={handleFieldChange}
    />
  );
};
