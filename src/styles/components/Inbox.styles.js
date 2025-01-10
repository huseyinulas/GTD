import styled from '@emotion/styled';

export const PageHeader = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  color: #1a202c;
  margin: 0;
`;

export const AddTaskForm = styled.form`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #2d3748;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #0056b3;
  }
`;

export const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TaskItem = styled.li`
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
`;

export const TaskTitle = styled.span`
  font-weight: 500;
  color: #2d3748;
`;

export const ProcessButton = styled(Button)`
  background-color: #10b981;
  
  &:hover {
    background-color: #059669;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #718096;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const ClearButton = styled(Button)`
  background-color: ${props => props.disabled ? '#cbd5e0' : '#dc3545'};
  
  &:hover {
    background-color: ${props => props.disabled ? '#cbd5e0' : '#c82333'};
  }
`;

export const Shortcut = styled.span`
  font-size: 0.75rem;
  color: #718096;
  margin-left: 0.5rem;
`; 