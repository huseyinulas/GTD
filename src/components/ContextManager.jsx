import { useState } from 'react';
import { useGTD } from '../context/GTDContext';
import styled from '@emotion/styled';

const Container = styled.div`
  padding: 20px;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #1a202c;
  margin-bottom: 0.5rem;
`;

const ContextList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContextItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  gap: 1rem;
`;

const ContextName = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #4299e1;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: ${props => props.variant === 'danger' ? '#f56565' : '#4299e1'};
  color: white;
  cursor: pointer;
  &:hover {
    background: ${props => props.variant === 'danger' ? '#e53e3e' : '#3182ce'};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const AddContextForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.checked ? '#48bb78' : '#cbd5e0'};
  transition: 0.4s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
    transform: ${props => props.checked ? 'translateX(24px)' : 'translateX(0)'};
  }
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const SwitchLabel = styled.div`
  font-size: 0.875rem;
  color: #4a5568;
  margin-left: 0.5rem;
`;

const VisibilityControl = styled.div`
  display: flex;
  align-items: center;
`;

const ContextManager = () => {
  const { contexts, updateContexts, hiddenContexts, setHiddenContexts } = useGTD();
  const [newContext, setNewContext] = useState('');
  const [editingContext, setEditingContext] = useState(null);
  const [editValue, setValue] = useState('');

  const handleAddContext = (e) => {
    e.preventDefault();
    if (!newContext) return;

    const formattedContext = newContext.startsWith('@') ? newContext : `@${newContext}`;
    if (!contexts.includes(formattedContext)) {
      updateContexts([...contexts, formattedContext]);
      setNewContext('');
    }
  };

  const startEditing = (context) => {
    setEditingContext(context);
    setValue(context);
  };

  const handleUpdateContext = (oldContext, newValue) => {
    if (!newValue.trim()) {
      setEditingContext(null);
      return;
    }

    const formattedContext = newValue.startsWith('@') ? newValue : `@${newValue}`;
    if (formattedContext !== oldContext) {
      const updatedContexts = contexts.map(c => 
        c === oldContext ? formattedContext : c
      );
      updateContexts(updatedContexts);
    }
    setEditingContext(null);
  };

  const handleDeleteContext = (contextToDelete) => {
    if (window.confirm(`Are you sure you want to delete ${contextToDelete}?`)) {
      const updatedContexts = contexts.filter(c => c !== contextToDelete);
      updateContexts(updatedContexts);
    }
  };

  const toggleContextVisibility = (context) => {
    const newHiddenContexts = new Set([...hiddenContexts]);
    if (hiddenContexts.has(context)) {
      newHiddenContexts.delete(context);
    } else {
      newHiddenContexts.add(context);
    }
    setHiddenContexts(newHiddenContexts);
  };

  return (
    <Container>
      <PageHeader>
        <Title>Manage Contexts</Title>
      </PageHeader>

      <AddContextForm onSubmit={handleAddContext}>
        <Input
          type="text"
          value={newContext}
          onChange={(e) => setNewContext(e.target.value)}
          placeholder="Add new context (e.g., @home)"
        />
        <Button type="submit" disabled={!newContext}>
          Add Context
        </Button>
      </AddContextForm>

      <ContextList>
        {contexts.map(context => (
          <ContextItem key={context}>
            <ContextName>
              {editingContext === context ? (
                <Input
                  type="text"
                  value={editValue}
                  autoFocus
                  onChange={(e) => setValue(e.target.value)}
                  onBlur={() => handleUpdateContext(context, editValue)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleUpdateContext(context, editValue);
                    } else if (e.key === 'Escape') {
                      setEditingContext(null);
                      setValue('');
                    }
                  }}
                />
              ) : (
                context
              )}
            </ContextName>
            <VisibilityControl>
              <Switch>
                <SwitchInput
                  type="checkbox"
                  checked={!hiddenContexts.has(context)}
                  onChange={() => toggleContextVisibility(context)}
                />
                <Slider checked={!hiddenContexts.has(context)} />
              </Switch>
              <SwitchLabel>
                {hiddenContexts.has(context) ? 'Hidden' : 'Visible'}
              </SwitchLabel>
            </VisibilityControl>
            <Button onClick={() => startEditing(context)}>
              Edit
            </Button>
            <Button 
              variant="danger" 
              onClick={() => handleDeleteContext(context)}
            >
              Delete
            </Button>
          </ContextItem>
        ))}
      </ContextList>
    </Container>
  );
};

export default ContextManager; 