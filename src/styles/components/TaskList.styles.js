import styled from '@emotion/styled';

export const List = styled.ul`
  list-style: none;
  padding: 0;
`;

export const TaskItem = styled.li`
  padding: 15px;
  border: 1px solid #eee;
  margin-bottom: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
`;

export const Context = styled.span`
  font-size: 0.8em;
  color: #666;
  background: #f0f0f0;
  padding: 2px 6px;
  border-radius: 3px;
  margin-left: 10px;
`;

export const CompleteButton = styled.button`
  padding: 4px 8px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #218838;
  }
`; 