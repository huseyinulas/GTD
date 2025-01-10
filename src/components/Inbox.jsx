import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGTD } from '../context/GTDContext';
import {
  PageHeader,
  Title,
  AddTaskForm,
  Input,
  Button,
  TaskList,
  TaskItem,
  TaskTitle,
  ProcessButton,
  EmptyState,
  ButtonGroup,
  ClearButton,
  Shortcut
} from '../styles/components/Inbox.styles';

const Inbox = () => {
  const navigate = useNavigate();
  const { tasks, addTask, updateTask } = useGTD();
  const [newTask, setNewTask] = useState('');

  const inboxTasks = tasks.filter(task => task.status === 'in');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask({
        id: Date.now().toString(),
        title: newTask,
        status: 'in',
        createdAt: new Date()
      });
      setNewTask('');
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all inbox items?')) {
      inboxTasks.forEach(task => {
        updateTask({
          ...task,
          status: 'trash'
        });
      });
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl + N: Focus new task input
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        document.getElementById('new-task-input').focus();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [inboxTasks.length]);

  return (
    <div>
      <PageHeader>
        <Title>Inbox</Title>
        <ButtonGroup>
          <ClearButton 
            onClick={handleClearAll}
            disabled={inboxTasks.length === 0}
          >
            Clear All
          </ClearButton>
        </ButtonGroup>
      </PageHeader>

      <AddTaskForm onSubmit={handleSubmit}>
        <Input
          id="new-task-input"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="What's on your mind? (Ctrl+N)"
          autoFocus
        />
        <Button type="submit">Add Task</Button>
      </AddTaskForm>

      <TaskList>
        {inboxTasks.map(task => (
          <TaskItem key={task.id}>
            <TaskTitle>{task.title}</TaskTitle>
            <ProcessButton onClick={() => navigate(`/process/${task.id}`)}>
              Process
            </ProcessButton>
          </TaskItem>
        ))}
      </TaskList>

      {inboxTasks.length === 0 && (
        <EmptyState>
          <p>Your inbox is empty. Great job! 🎉</p>
          <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Press Ctrl+N to quickly add a new task
          </p>
        </EmptyState>
      )}
    </div>
  );
};

export default Inbox; 