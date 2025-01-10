import styled from '@emotion/styled';
import { Card, Button } from '../shared';

export const ProcessContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const TaskTitle = styled.h2`
  font-size: 1.5rem;
  color: #1a202c;
  margin-bottom: 0.5rem;
`;

export const QuestionCard = styled(Card)``;

export const Question = styled.h3`
  color: #2d3748;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
`;

export const ActionButton = styled(Button)`
  ${props => props.variant === 'success' && `
    background-color: #10b981;
    &:hover {
      background-color: #059669;
    }
  `}

  ${props => props.variant === 'danger' && `
    background-color: #dc3545;
    &:hover {
      background-color: #c82333;
    }
  `}
`;

export const TimerSection = styled(QuestionCard)`
  text-align: center;
`;

export const ContextInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #2d3748;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
  }
`;

export const ContextList = styled.datalist`
  width: 100%;
`;

export const ContextHint = styled.div`
  font-size: 0.875rem;
  color: #718096;
  text-align: center;
  margin-top: 0.5rem;
`;

// Re-export shared components
export { PageHeader, ButtonGroup, ShortcutHint } from '../shared'; 