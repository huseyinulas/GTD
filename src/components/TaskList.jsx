import styled from '@emotion/styled';
import { useGTD } from '../context/GTDContext';

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const TaskItem = styled.li`
  padding: 15px;
  border: 1px solid #eee;
  margin-bottom: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
`;

const Context = styled.span`
  font-size: 0.8em;
  color: #666;
  background: #f0f0f0;
  padding: 2px 6px;
  border-radius: 3px;
  margin-left: 10px;
`;

const CompleteButton = styled.button`
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

const TaskList = ({ title, tasks }) => {
  const { updateTask } = useGTD();

  const handleComplete = (task) => {
    updateTask({
      ...task,
      status: 'done'
    });
  };

  return (
    <div>
      {title && <h2>{title}</h2>}
      <List>
        {tasks.map(task => (
          <TaskItem key={task.id}>
            <div>
              {task.title}
              {task.context && <Context>{task.context}</Context>}
            </div>
            <CompleteButton onClick={() => handleComplete(task)}>
              Complete
            </CompleteButton>
          </TaskItem>
        ))}
        {tasks.length === 0 && (
          <p>No tasks available</p>
        )}
      </List>
    </div>
  );
};

export default TaskList; 