import { useState } from 'react';
import { useGTD } from '../context/GTDContext';
import {
  Container,
  PageHeader,
  Title,
  ContextList,
  ContextItem,
  ContextName,
  Input,
  Button,
  AddContextForm,
  Switch,
  Slider,
  SwitchInput,
  SwitchLabel,
  VisibilityControl
} from '../styles/components/ContextManager.styles';

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