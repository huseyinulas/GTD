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

export const AddProjectForm = styled.form`
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

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #2d3748;
  min-height: 100px;
  resize: vertical;

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
  transition: all 0.2s;
  
  &:hover {
    background-color: #0056b3;
    transform: translateY(-1px);
  }
`;

export const ProjectCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
`;

export const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  color: #2d3748;
  margin: 0;
`;

export const ProjectDescription = styled.p`
  color: #718096;
  margin: 1rem 0;
  line-height: 1.5;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const DeleteButton = styled(Button)`
  background-color: #dc3545;
  
  &:hover {
    background-color: #c82333;
  }
`;

export const AddActionButton = styled(Button)`
  background-color: #10b981;
  
  &:hover {
    background-color: #059669;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #718096;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`; 