// delayNode.js — Introduce a configurable delay into the pipeline

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

const DELAY_CONFIG = {
  title: 'Delay',
  icon: '⏱️',
  color: 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)',
  inputs: [
    { id: 'trigger', label: 'trigger' },
  ],
  outputs: [
    { id: 'done', label: 'done' },
  ],
  fields: [
    {
      type: 'number',
      name: 'duration',
      label: 'Duration (ms)',
      placeholder: '1000',
      defaultValue: 1000,
    },
    {
      type: 'select',
      name: 'unit',
      label: 'Unit',
      options: ['Milliseconds', 'Seconds', 'Minutes'],
      defaultValue: 'Milliseconds',
    },
  ],
};

export const DelayNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);

  const [localData, setLocalData] = useState({
    duration: data?.duration || 1000,
    unit:     data?.unit     || 'Milliseconds',
  });

  const handleFieldChange = (fieldName, value) => {
    setLocalData((prev) => ({ ...prev, [fieldName]: value }));
    updateNodeField(id, fieldName, value);
  };

  return (
    <BaseNode
      id={id}
      data={localData}
      config={DELAY_CONFIG}
      onFieldChange={handleFieldChange}
    />
  );
};
