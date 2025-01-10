import { useParams, useNavigate } from 'react-router-dom';
import { useGTD } from '../context/GTDContext';
import { useState, useEffect } from 'react';
import Timer from './Timer';
import { format } from 'date-fns';
import {
  ProcessContainer,
  PageHeader,
  TaskTitle,
  QuestionCard,
  Question,
  ButtonGroup,
  ActionButton,
  TimerSection,
  ShortcutHint,
  ContextInput,
  ContextList,
  ContextHint
} from '../styles/components/ProcessTask.styles';

const ProcessTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { tasks, updateTask, contexts, addProject, updateContexts, hiddenContexts } = useGTD();
  const [step, setStep] = useState('actionable');
  const [selectedContext, setSelectedContext] = useState('');
  const [showTimer, setShowTimer] = useState(false);
  
  const task = tasks.find(t => t.id === taskId);
  
  if (!task) {
    return <div>Task not found</div>;
  }

  const handleActionable = (isActionable) => {
    if (isActionable) {
      setStep('context');
    } else {
      setStep('non-actionable');
    }
  };

  const handleTimerComplete = () => {
    updateTask({
      ...task,
      status: 'done'
    });
    navigate('/');
  };

  const handleNonActionable = (newStatus) => {
    updateTask({
      ...task,
      status: newStatus
    });
    navigate('/');
  };

  const handleContextSelect = (context) => {
    const formattedContext = context.startsWith('@') ? context : `@${context}`;
    
    if (context && !contexts.includes(context)) {
      updateContexts([...contexts, formattedContext]);
    }
    setSelectedContext(formattedContext);
    setStep('next-action');
  };

  const handleAction = (action) => {
    if (action === 'project') {
      // Create a new project
      const projectId = Date.now().toString();
      addProject({
        id: projectId,
        title: task.title,
        description: task.notes || '',
        status: 'active',
        createdAt: new Date()
      });
      
      // Update the task to be part of the project
      updateTask({
        ...task,
        status: 'next',
        project: projectId,
        context: selectedContext,
        dueDate: format(new Date(), 'yyyy-MM-dd')
      });
      
      navigate('/projects');
    } else {
      updateTask({
        ...task,
        status: action,
        context: selectedContext,
        dueDate: action === 'next' ? format(new Date(), 'yyyy-MM-dd') : undefined
      });
      navigate('/');
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only handle shortcuts when not in timer mode
      if (showTimer) return;

      switch (step) {
        case 'actionable':
          if (e.key === 'y') {
            e.preventDefault();
            handleActionable(true);
          } else if (e.key === 'n') {
            e.preventDefault();
            handleActionable(false);
          }
          break;

        case 'non-actionable':
          if (e.key === 'r') {
            e.preventDefault();
            handleNonActionable('reference');
          } else if (e.key === 's') {
            e.preventDefault();
            handleNonActionable('someday');
          } else if (e.key === 'd') {
            e.preventDefault();
            handleNonActionable('trash');
          }
          break;

        case 'context':
          // Number keys 1-9 for selecting contexts
          if (/^[1-9]$/.test(e.key) && contexts[parseInt(e.key) - 1]) {
            e.preventDefault();
            handleContextSelect(contexts[parseInt(e.key) - 1]);
          }
          break;

        case 'next-action':
          if (e.key === 'n') {
            e.preventDefault();
            handleAction('next');
          } else if (e.key === 'w') {
            e.preventDefault();
            handleAction('waiting');
          } else if (e.key === 'p') {
            e.preventDefault();
            handleAction('project');
          }
          break;
      }

      // Global shortcuts
      if (e.key === 'Escape') {
        e.preventDefault();
        navigate('/');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [step, showTimer, contexts]);

  // Filter out hidden contexts when displaying context options
  const visibleContexts = contexts.filter(context => !hiddenContexts.has(context));

  return (
    <ProcessContainer>
      <PageHeader>
        <TaskTitle>{task.title}</TaskTitle>
        <ShortcutHint>Press Esc to cancel</ShortcutHint>
      </PageHeader>
      
      {step === 'actionable' && (
        <QuestionCard>
          <Question>Is it actionable?</Question>
          <ButtonGroup>
            <ActionButton onClick={() => handleActionable(true)}>
              Yes <ShortcutHint>Y</ShortcutHint>
            </ActionButton>
            <ActionButton onClick={() => handleActionable(false)}>
              No <ShortcutHint>N</ShortcutHint>
            </ActionButton>
          </ButtonGroup>
        </QuestionCard>
      )}

      {showTimer && (
        <TimerSection>
          <Question>Do it now!</Question>
          <Timer onComplete={handleTimerComplete} />
          <ActionButton variant="success" onClick={handleTimerComplete}>
            Mark as Complete
          </ActionButton>
        </TimerSection>
      )}

      {step === 'non-actionable' && (
        <QuestionCard>
          <Question>What should we do with it?</Question>
          <ButtonGroup>
            <ActionButton onClick={() => handleNonActionable('reference')}>
              Keep as Reference <ShortcutHint>R</ShortcutHint>
            </ActionButton>
            <ActionButton onClick={() => handleNonActionable('someday')}>
              Someday/Maybe <ShortcutHint>S</ShortcutHint>
            </ActionButton>
            <ActionButton onClick={() => handleNonActionable('trash')}>
              Delete <ShortcutHint>D</ShortcutHint>
            </ActionButton>
          </ButtonGroup>
        </QuestionCard>
      )}

      {step === 'context' && (
        <QuestionCard>
          <Question>Select Context</Question>
          <ContextInput
            type="text"
            list="contexts"
            placeholder="Enter or select context"
            value={selectedContext}
            onChange={(e) => {
              let value = e.target.value;
              if (value && !value.startsWith('@')) {
                value = `@${value}`;
              }
              setSelectedContext(value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleContextSelect(selectedContext);
              }
            }}
            autoFocus
          />
          <ContextList id="contexts">
            {visibleContexts.map(context => (
              <option key={context} value={context} />
            ))}
          </ContextList>
          <ButtonGroup>
            {visibleContexts.map((context, index) => (
              <ActionButton 
                key={context} 
                onClick={() => handleContextSelect(context)}
              >
                {context} <ShortcutHint>{index + 1}</ShortcutHint>
              </ActionButton>
            ))}
          </ButtonGroup>
          <ContextHint>
            Type a new context or select an existing one, then press Enter
          </ContextHint>
        </QuestionCard>
      )}

      {step === 'next-action' && (
        <QuestionCard>
          <Question>What's the next action?</Question>
          <ButtonGroup>
            <ActionButton onClick={() => handleAction('next')}>
              Add to Next Actions <ShortcutHint>N</ShortcutHint>
            </ActionButton>
            <ActionButton onClick={() => handleAction('waiting')}>
              Waiting For <ShortcutHint>W</ShortcutHint>
            </ActionButton>
            <ActionButton onClick={() => handleAction('project')}>
              Create Project <ShortcutHint>P</ShortcutHint>
            </ActionButton>
          </ButtonGroup>
        </QuestionCard>
      )}
    </ProcessContainer>
  );
};

export default ProcessTask; 