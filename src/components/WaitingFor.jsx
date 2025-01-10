import { useState } from 'react';
import { useGTD } from '../context/GTDContext';
import styled from '@emotion/styled';
import { format, parseISO } from 'date-fns';

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #1a202c;
  margin-bottom: 0.5rem;
`;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TaskItem = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const TaskTitle = styled.h3`
  font-size: 1.1rem;
  color: #2d3748;
  margin: 0;
`;

const TaskDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  color: #718096;
  font-size: 0.9rem;
`;

const DetailItem = styled.span`
  background: #f7fafc;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background-color: #059669;
    transform: translateY(-1px);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #718096;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const CancelButton = styled(Button)`
  background-color: #e2e8f0;
  color: #4a5568;
  
  &:hover {
    background-color: #cbd5e0;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  color: #4a5568;
`;

const DateInput = styled(Input)`
  // Add specific styles for date input if needed
`;

const WaitingFor = () => {
  const { tasks, updateTask } = useGTD();
  const [selectedTask, setSelectedTask] = useState(null);
  const [delegatedTo, setDelegatedTo] = useState('');
  const [waitUntil, setWaitUntil] = useState('');
  const waitingTasks = tasks.filter(task => task.status === 'waiting');

  const handleComplete = (task) => {
    updateTask({
      ...task,
      status: 'done',
      completedAt: new Date().toISOString()
    });
  };

  const openDelegationModal = (task) => {
    setSelectedTask(task);
    setDelegatedTo(task.delegatedTo || '');
    setWaitUntil(task.waitUntil || '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTask) {
      updateTask({
        ...selectedTask,
        delegatedTo,
        delegatedDate: selectedTask.delegatedDate || new Date().toISOString(),
        waitUntil: waitUntil || null
      });
      setSelectedTask(null);
      setDelegatedTo('');
      setWaitUntil('');
    }
  };

  return (
    <div>
      <PageHeader>
        <Title>Waiting For</Title>
      </PageHeader>

      <TaskList>
        {waitingTasks.map(task => (
          <TaskItem key={task.id} onClick={() => openDelegationModal(task)}>
            <TaskHeader>
              <TaskTitle>{task.title}</TaskTitle>
              <Button onClick={(e) => {
                e.stopPropagation();
                handleComplete(task);
              }}>
                Received
              </Button>
            </TaskHeader>
            <TaskDetails>
              {task.delegatedTo && (
                <DetailItem>
                  <span>👤</span> {task.delegatedTo}
                </DetailItem>
              )}
              {task.delegatedDate && (
                <DetailItem>
                  <span>📅</span> Since: {format(parseISO(task.delegatedDate), 'MMM d, yyyy')}
                </DetailItem>
              )}
              {task.waitUntil && (
                <DetailItem>
                  <span>⏰</span> Until: {format(parseISO(task.waitUntil), 'MMM d, yyyy')}
                </DetailItem>
              )}
            </TaskDetails>
          </TaskItem>
        ))}
      </TaskList>

      {waitingTasks.length === 0 && (
        <EmptyState>
          <p>No tasks waiting for others. 🎉</p>
        </EmptyState>
      )}

      {selectedTask && (
        <Modal onClick={() => setSelectedTask(null)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <h3>Waiting for what?</h3>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Delegated to</Label>
                <Input
                  type="text"
                  placeholder="Enter name or description"
                  value={delegatedTo}
                  onChange={(e) => setDelegatedTo(e.target.value)}
                  autoFocus
                />
              </FormGroup>
              <FormGroup>
                <Label>Wait until</Label>
                <DateInput
                  type="date"
                  value={waitUntil}
                  onChange={(e) => setWaitUntil(e.target.value)}
                />
              </FormGroup>
              <ButtonGroup>
                <CancelButton type="button" onClick={() => setSelectedTask(null)}>
                  Cancel
                </CancelButton>
                <Button type="submit">
                  {selectedTask.delegatedTo ? 'Update' : 'Save'}
                </Button>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default WaitingFor; 