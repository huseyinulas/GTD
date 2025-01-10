import styled from '@emotion/styled';

export const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  color: #1a202c;
  margin-bottom: 0.5rem;
`;

export const ReviewSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

export const SectionTitle = styled.h3`
  font-size: 1.1rem;
  color: #2d3748;
  margin-bottom: 1rem;
`;

export const ChecklistContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ChecklistItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 8px;
  background: ${props => props.checked ? '#f0fff4' : '#fff'};
  border: 1px solid ${props => props.checked ? '#9ae6b4' : '#e2e8f0'};
  transition: all 0.2s;

  &:hover {
    border-color: ${props => props.checked ? '#68d391' : '#cbd5e0'};
  }
`;

export const Checkbox = styled.input`
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 1rem;
  cursor: pointer;
`;

export const Label = styled.label`
  color: #4a5568;
  font-size: 1rem;
  cursor: pointer;
  user-select: none;
  flex: 1;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #edf2f7;
  border-radius: 4px;
  margin: 1.5rem 0;
  overflow: hidden;
`;

export const Progress = styled.div`
  width: ${props => props.value}%;
  height: 100%;
  background: #10b981;
  transition: width 0.3s ease;
`;

export const Stats = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

export const Stat = styled.div`
  background: #f7fafc;
  padding: 1rem;
  border-radius: 8px;
  min-width: 150px;
  
  h4 {
    font-size: 0.875rem;
    color: #718096;
    margin: 0 0 0.5rem 0;
  }
  
  p {
    font-size: 1.25rem;
    color: #2d3748;
    font-weight: 600;
    margin: 0;
  }
`; 