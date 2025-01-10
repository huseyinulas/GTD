import styled from '@emotion/styled';
import { Card, Input, Select as SharedSelect } from '../shared';

export const CompletedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CompletedItem = styled(Card)`
  margin-bottom: 0;
  padding: 1rem 1.5rem;
`;

export const TaskTitle = styled.h3`
  font-size: 1.1rem;
  color: #2d3748;
  margin: 0 0 0.5rem 0;
`;

export const TaskDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const DateText = styled.span`
  color: #718096;
  font-size: 0.9rem;
`;

export const Context = styled.span`
  background-color: #edf2f7;
  color: #4a5568;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.85rem;
  font-weight: 500;
`;

export const FilterSection = styled(Card)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const SearchInput = styled(Input)`
  margin-bottom: 0;
  flex: 1;
`;

export const Select = styled(SharedSelect)`
  margin: 0;
  min-width: 150px;
`;

// Re-export shared components
export { PageHeader, Title, EmptyState } from '../shared'; 