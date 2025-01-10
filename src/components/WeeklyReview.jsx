import { useState } from 'react';
import { useGTD } from '../context/GTDContext';
import DataManagement from './DataManagement';
import {
  PageHeader,
  Title,
  ReviewSection,
  SectionTitle,
  ChecklistContainer,
  ChecklistItem,
  Checkbox,
  Label,
  ProgressBar,
  Progress,
  Stats,
  Stat
} from '../styles/components/WeeklyReview.styles';

const WeeklyReview = () => {
  const { tasks, projects } = useGTD();
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const reviewSteps = [
    'Review previous calendar data',
    'Review upcoming calendar',
    'Review waiting for list',
    'Review project lists',
    'Review next actions lists',
    'Review someday/maybe list',
    'Review goals and objectives'
  ];

  const toggleStep = (step) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(step)) {
      newCompleted.delete(step);
    } else {
      newCompleted.add(step);
    }
    setCompletedSteps(newCompleted);
  };

  const progress = (completedSteps.size / reviewSteps.length) * 100;

  return (
    <div>
      <PageHeader>
        <Title>Weekly Review</Title>
      </PageHeader>

      <Stats>
        <Stat>
          <h4>Active Projects</h4>
          <p>{projects.filter(p => p.status === 'active').length}</p>
        </Stat>
        <Stat>
          <h4>Next Actions</h4>
          <p>{tasks.filter(t => t.status === 'next').length}</p>
        </Stat>
        <Stat>
          <h4>Waiting For</h4>
          <p>{tasks.filter(t => t.status === 'waiting').length}</p>
        </Stat>
      </Stats>

      <ReviewSection>
        <SectionTitle>Review Progress</SectionTitle>
        <ProgressBar>
          <Progress value={progress} />
        </ProgressBar>
        <ChecklistContainer>
          {reviewSteps.map(step => (
            <ChecklistItem 
              key={step}
              checked={completedSteps.has(step)}
            >
              <Checkbox
                type="checkbox"
                id={step}
                checked={completedSteps.has(step)}
                onChange={() => toggleStep(step)}
              />
              <Label htmlFor={step}>{step}</Label>
            </ChecklistItem>
          ))}
        </ChecklistContainer>
      </ReviewSection>

      <ReviewSection>
        <SectionTitle>Data Management</SectionTitle>
        <DataManagement />
      </ReviewSection>
    </div>
  );
};

export default WeeklyReview; 