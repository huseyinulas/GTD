import { useState } from 'react';
import styled from '@emotion/styled';
import { useGTD } from '../context/GTDContext';
import { format } from 'date-fns';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  color: #1a202c;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
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

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #2d3748;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
  }
`;

const SubmitButton = styled(Button)`
  background-color: #10b981;
  color: white;
  
  &:hover {
    background-color: #059669;
  }
`;

const CancelButton = styled(Button)`
  background-color: #6b7280;
  color: white;

  &:hover {
    background-color: #4b5563;
  }
`;

const ContextInput = styled(Input)`
  margin-bottom: 0.5rem;
`;

const ContextList = styled.datalist`
  width: 100%;
`;

const ContextHint = styled.div`
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 1rem;
`;

const AddActionModal = ({ projectId, onClose }) => {
  const { addTask, contexts, updateContexts } = useGTD();
  const [newAction, setNewAction] = useState({ 
    title: '', 
    context: '' 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newAction.title.trim()) {
      // Ensure context starts with @
      const formattedContext = newAction.context.startsWith('@') 
        ? newAction.context 
        : `@${newAction.context}`;

      // Add new context if it doesn't exist
      if (formattedContext && !contexts.includes(formattedContext)) {
        updateContexts([...contexts, formattedContext]);
      }

      addTask({
        id: Date.now().toString(),
        title: newAction.title,
        status: 'next',
        project: projectId,
        context: formattedContext,
        createdAt: new Date(),
        dueDate: format(new Date(), 'yyyy-MM-dd')
      });
      onClose();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalTitle>Add Next Action</ModalTitle>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="What's the next action?"
            value={newAction.title}
            onChange={(e) => setNewAction(prev => ({ ...prev, title: e.target.value }))}
            autoFocus
          />
          <ContextInput
            type="text"
            list="contexts"
            placeholder="Enter or select context"
            value={newAction.context}
            onChange={(e) => {
              let value = e.target.value;
              if (value && !value.startsWith('@')) {
                value = `@${value}`;
              }
              setNewAction(prev => ({ 
                ...prev, 
                context: value
              }));
            }}
          />
          <ContextList id="contexts">
            {contexts.map(context => (
              <option key={context} value={context} />
            ))}
          </ContextList>
          <ContextHint>
            Type a new context or select an existing one
          </ContextHint>
          <ButtonGroup>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
            <SubmitButton type="submit">
              Add Action
            </SubmitButton>
          </ButtonGroup>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddActionModal; 