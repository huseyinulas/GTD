import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 20px;
`;

export const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  color: #1a202c;
  margin-bottom: 0.5rem;
`;

export const ContextList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ContextItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  gap: 1rem;
`;

export const ContextName = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #4299e1;
  }
`;

export const Button = styled.button`
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

export const AddContextForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
`;

export const Slider = styled.span`
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

export const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

export const SwitchLabel = styled.div`
  font-size: 0.875rem;
  color: #4a5568;
  margin-left: 0.5rem;
`;

export const VisibilityControl = styled.div`
  display: flex;
  align-items: center;
`; 