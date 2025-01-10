import { useState } from 'react';
import { useGTD } from '../context/GTDContext';
import { format } from 'date-fns';
import {
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ContextInput,
  ContextList,
  ContextHint,
  ButtonGroup,
  SubmitButton,
  CancelButton
} from '../styles/components/AddActionModal.styles';

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