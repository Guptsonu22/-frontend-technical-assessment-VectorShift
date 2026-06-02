// llmNode.js — refactored to use BaseNode abstraction

import { BaseNode } from './BaseNode';

const LLM_CONFIG = {
  title: 'LLM',
  icon: '🤖',
  color: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
  inputs: [
    { id: 'system',  label: 'system',  style: { top: '33%' } },
    { id: 'prompt',  label: 'prompt',  style: { top: '66%' } },
  ],
  outputs: [
    { id: 'response', label: 'response' },
  ],
  fields: [
    {
      type: 'readonly',
      name: '_info',
      label: 'Model',
      defaultValue: 'GPT-4o (default)',
    },
  ],
};

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      config={LLM_CONFIG}
    />
  );
};
