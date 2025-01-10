import { useState } from 'react';
import { useGTD } from '../context/GTDContext';
import { format, parseISO } from 'date-fns';
import {
  PageHeader,
  Title,
  TaskList,
  TaskItem,
  TaskHeader,
  TaskTitle,
  TaskDetails,
  DetailItem,
  Button,
  EmptyState,
  Modal,
  ModalContent,
  Form,
  Input,
  ButtonGroup,
  CancelButton,
  FormGroup,
  Label,
  DateInput
} from '../styles/components/WaitingFor.styles';

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