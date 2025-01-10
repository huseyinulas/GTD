import styled from '@emotion/styled';

export const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  color: #1a202c;
  margin-bottom: 0.5rem;
`;

export const FilterSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

export const ContextFilter = styled.div`
  display: flex;
  gap: 0.375rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

export const ContextButton = styled.button`
  padding: 0.375rem 0.75rem;
  border: 1px solid ${props => props.active ? '#007bff' : '#e2e8f0'};
  border-radius: 6px;
  background: ${props => props.active ? '#007bff' : 'white'};
  color: ${props => props.active ? 'white' : '#2d3748'};
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
  font-size: 0.875rem;
  
  &:hover {
    background: ${props => props.active ? '#0056b3' : '#f8f9fa'};
  }
`;

export const FilterBar = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const Select = styled.select`
  padding: 0.375rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  color: #2d3748;
  cursor: pointer;
  min-width: 150px;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
  }
`;

export const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const TaskItem = styled.li`
  padding: 0.75rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s;

  ${props => props.isOverdue && `
    border-left: 3px solid #dc3545;
  `}
  
  ${props => props.isDueToday && `
    border-left: 3px solid #ffc107;
  `}

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
`;

export const TaskDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const TaskTitle = styled.span`
  font-weight: 500;
  color: #2d3748;
  font-size: 0.9375rem;
`;

export const Context = styled.span`
  font-size: 0.75rem;
  color: #4a5568;
  background: #edf2f7;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-weight: 500;
`;

export const TaskActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const DateInput = styled.input`
  padding: 0.375rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  color: #2d3748;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
  }
`;

export const CompleteButton = styled.button`
  padding: 0.375rem 0.75rem;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-weight: 500;
  font-size: 0.875rem;
  
  &:hover {
    background-color: #059669;
  }
`;

export const StatsSection = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
`;

export const StatCard = styled.div`
  background: white;
  padding: 0.75rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  min-width: 110px;

  h4 {
    color: #718096;
    font-size: 0.75rem;
    margin: 0 0 0.25rem 0;
  }

  p {
    color: #2d3748;
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0;
  }
`;

export const SearchBar = styled.div`
  margin-bottom: 0.75rem;
`;

export const TaskNotes = styled.p`
  color: #718096;
  font-size: 0.8125rem;
  margin: 0.375rem 0 0 0;
  line-height: 1.4;
`; 