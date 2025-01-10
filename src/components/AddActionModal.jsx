import { useState } from 'react';
import { useGTD } from '../context/GTDContext';
import { Input } from '../styles/shared';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  TextArea
} from '../styles/components/Modal.styles';

const AddActionModal = ({ projectId, onClose }) => {
  const { addTask, contexts } = useGTD();
  const [newAction, setNewAction] = useState({
    title: '',
    notes: '',
    context: '',
    energy: 'low',
    time: '5',
    dueDate: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newAction.title.trim()) {
      addTask({
        id: Date.now().toString(),
        title: newAction.title,
        notes: newAction.notes,
        context: newAction.context,
        energy: newAction.energy,
        time: newAction.time,
        dueDate: newAction.dueDate,
        status: 'next',
        project: projectId,
        createdAt: new Date().toISOString()
      });
      onClose();
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            <ModalTitle>Add New Action</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Input
              type="text"
              placeholder="Action Title"
              value={newAction.title}
              onChange={(e) => setNewAction(prev => ({ ...prev, title: e.target.value }))}
              autoFocus
            />
            <TextArea
              placeholder="Notes (optional)"
              value={newAction.notes}
              onChange={(e) => setNewAction(prev => ({ ...prev, notes: e.target.value }))}
            />
            <Input
              type="date"
              value={newAction.dueDate}
              onChange={(e) => setNewAction(prev => ({ ...prev, dueDate: e.target.value }))}
              style={{ marginBottom: '1rem' }}
            />
            <Select
              value={newAction.context}
              onChange={(e) => setNewAction(prev => ({ ...prev, context: e.target.value }))}
            >
              <option value="">Select Context</option>
              {contexts.map(context => (
                <option key={context} value={context}>{context}</option>
              ))}
            </Select>
            <Select
              value={newAction.energy}
              onChange={(e) => setNewAction(prev => ({ ...prev, energy: e.target.value }))}
            >
              <option value="low">Low Energy</option>
              <option value="medium">Medium Energy</option>
              <option value="high">High Energy</option>
            </Select>
            <Select
              value={newAction.time}
              onChange={(e) => setNewAction(prev => ({ ...prev, time: e.target.value }))}
            >
              <option value="5">5 minutes</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2+ hours</option>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit" primary>Add Action</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddActionModal; 