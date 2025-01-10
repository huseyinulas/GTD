import { useGTD } from '../context/GTDContext';
import {
  List,
  TaskItem,
  Context,
  CompleteButton
} from '../styles/components/TaskList.styles';

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