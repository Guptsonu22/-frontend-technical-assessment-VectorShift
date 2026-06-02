// emailNode.js — Send an email notification from the pipeline

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

const EMAIL_CONFIG = {
  title: 'Email',
  icon: '✉️',
  color: 'linear-gradient(135deg, #DA4453 0%, #89216B 100%)',
  inputs: [
    { id: 'body',    label: 'body'    },
    { id: 'trigger', label: 'trigger' },
  ],
  outputs: [
    { id: 'sent', label: 'sent' },
  ],
  fields: [
    {
      type: 'text',
      name: 'to',
      label: 'To',
      placeholder: 'recipient@example.com',
    },
    {
      type: 'text',
      name: 'subject',
      label: 'Subject',
      placeholder: 'Pipeline notification',
    },
    {
      type: 'select',
      name: 'priority',
      label: 'Priority',
      options: ['Normal', 'High', 'Low'],
      defaultValue: 'Normal',
    },
  ],
};

export const EmailNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);

  const [localData, setLocalData] = useState({
    to:       data?.to       || '',
    subject:  data?.subject  || '',
    priority: data?.priority || 'Normal',
  });

  const handleFieldChange = (fieldName, value) => {
    setLocalData((prev) => ({ ...prev, [fieldName]: value }));
    updateNodeField(id, fieldName, value);
  };

  return (
    <BaseNode
      id={id}
      data={localData}
      config={EMAIL_CONFIG}
      onFieldChange={handleFieldChange}
    />
  );
};
