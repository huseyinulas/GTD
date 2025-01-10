import styled from '@emotion/styled';
import { Card, Input as SharedInput, Button as SharedButton } from '../shared';

export const ProjectForm = styled.form`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

export const Input = styled(SharedInput)`
  margin: 0;
`;

export const Button = styled(SharedButton)`
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
`;

export const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ProjectItem = styled(Card)`
  margin: 0;
  padding: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProjectTitle = styled.h3`
  margin: 0;
  font-size: 0.9375rem;
  color: #2d3748;
`;

export const ProjectActions = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

// Re-export shared components
export { PageHeader, Title } from '../shared'; 