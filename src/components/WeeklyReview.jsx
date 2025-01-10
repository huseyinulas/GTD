import { useState } from 'react';
import { useGTD } from '../context/GTDContext';
import styled from '@emotion/styled';
import DataManagement from './DataManagement';

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #1a202c;
  margin-bottom: 0.5rem;
`;

const ReviewSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  color: #2d3748;
  margin-bottom: 1rem;
`;

const ChecklistContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ChecklistItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 8px;
  background: ${props => props.checked ? '#f0fff4' : '#fff'};
  border: 1px solid ${props => props.checked ? '#9ae6b4' : '#e2e8f0'};
  transition: all 0.2s;

  &:hover {
    border-color: ${props => props.checked ? '#68d391' : '#cbd5e0'};
  }
`;

const Checkbox = styled.input`
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 1rem;
  cursor: pointer;
`;

const Label = styled.label`
  color: #4a5568;
  font-size: 1rem;
  cursor: pointer;
  user-select: none;
  flex: 1;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #edf2f7;
  border-radius: 4px;
  margin: 1.5rem 0;
  overflow: hidden;
`;

const Progress = styled.div`
  width: ${props => props.value}%;
  height: 100%;
  background: #10b981;
  transition: width 0.3s ease;
`;

const Stats = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const Stat = styled.div`
  background: #f7fafc;
  padding: 1rem;
  border-radius: 8px;
  min-width: 150px;
  
  h4 {
    font-size: 0.875rem;
    color: #718096;
    margin: 0 0 0.5rem 0;
  }
  
  p {
    font-size: 1.25rem;
    color: #2d3748;
    font-weight: 600;
    margin: 0;
  }
`;

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