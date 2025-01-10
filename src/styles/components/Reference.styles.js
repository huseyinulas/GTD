import styled from '@emotion/styled';

export const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  color: #1a202c;
  margin-bottom: 0.5rem;
`;

export const ReferenceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ReferenceCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
`;

export const ReferenceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

export const ReferenceTitle = styled.h3`
  font-size: 1.1rem;
  color: #2d3748;
  margin: 0;
`;

export const ReferenceDate = styled.span`
  color: #718096;
  font-size: 0.9rem;
`;

export const ReferenceNotes = styled.p`
  color: #4a5568;
  margin-top: 0.75rem;
  font-size: 0.95rem;
  line-height: 1.5;
`;

export const TagsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

export const Tag = styled.span`
  background-color: #edf2f7;
  color: #4a5568;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.85rem;
  font-weight: 500;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #718096;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  color: #2d3748;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
  }

  &::placeholder {
    color: #a0aec0;
  }
`; 