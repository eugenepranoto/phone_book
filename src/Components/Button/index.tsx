import styled from '@emotion/styled';
import { Color } from '../../Constants/Color';

interface ButtonProps {
    link?: boolean;
}

const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${props => (props.link ? '0' : '8px 16px')};
  border: none;
  border-radius: 4px;
  background-color: ${props => (props.link ? 'transparent' : Color.Primary)};
  color: ${props => (props.link ? '' : 'white')};
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${props => (props.link ? 'transparent' : Color.Primary)};
  }
`;

export default Button;
