// apiNode.js — Fetch data from an external API endpoint

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

const API_CONFIG = {
  title: 'API Request',
  icon: '🌐',
  color: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
  inputs: [
    { id: 'body',   label: 'body'   },
    { id: 'headers', label: 'headers' },
  ],
  outputs: [
    { id: 'response', label: 'response' },
    { id: 'status',   label: 'status'   },
  ],
  fields: [
    {
      type: 'text',
      name: 'url',
      label: 'URL',
      placeholder: 'https://api.example.com/data',
    },
    {
      type: 'select',
      name: 'method',
      label: 'Method',
      options: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      defaultValue: 'GET',
    },
    {
      type: 'text',
      name: 'contentType',
      label: 'Content-Type',
      placeholder: 'application/json',
    },
  ],
};

export const APINode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);

  const [localData, setLocalData] = useState({
    url: data?.url || '',
    method: data?.method || 'GET',
    contentType: data?.contentType || 'application/json',
  });

  const handleFieldChange = (fieldName, value) => {
    setLocalData((prev) => ({ ...prev, [fieldName]: value }));
    updateNodeField(id, fieldName, value);
  };

  return (
    <BaseNode
      id={id}
      data={localData}
      config={API_CONFIG}
      onFieldChange={handleFieldChange}
    />
  );
};
