import { useState } from 'react';
import { useGTD } from '../context/GTDContext';
import { format } from 'date-fns';
import {
  PageHeader,
  Title,
  ReferenceList,
  ReferenceCard,
  ReferenceHeader,
  ReferenceTitle,
  ReferenceDate,
  ReferenceNotes,
  TagsContainer,
  Tag,
  EmptyState,
  SearchInput
} from '../styles/components/Reference.styles';

const Reference = () => {
  const { tasks } = useGTD();
  const [searchTerm, setSearchTerm] = useState('');
  
  const referenceTasks = tasks
    .filter(task => task.status === 'reference')
    .filter(task => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.notes && task.notes.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <div>
      <PageHeader>
        <Title>Reference Materials</Title>
      </PageHeader>

      <SearchInput
        type="text"
        placeholder="Search reference materials..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ReferenceList>
        {referenceTasks.map(task => (
          <ReferenceCard key={task.id}>
            <ReferenceHeader>
              <ReferenceTitle>{task.title}</ReferenceTitle>
              <ReferenceDate>
                Added: {format(new Date(task.createdAt), 'MMM d, yyyy')}
              </ReferenceDate>
            </ReferenceHeader>
            {task.notes && (
              <ReferenceNotes>{task.notes}</ReferenceNotes>
            )}
            {task.context && (
              <TagsContainer>
                <Tag>{task.context}</Tag>
                {task.project && <Tag>{task.project}</Tag>}
              </TagsContainer>
            )}
          </ReferenceCard>
        ))}
      </ReferenceList>

      {referenceTasks.length === 0 && (
        <EmptyState>
          <p>
            {searchTerm 
              ? 'No reference materials found matching your search.'
              : 'No reference materials yet. Process some tasks to add references! 📚'}
          </p>
        </EmptyState>
      )}
    </div>
  );
};

export default Reference; 