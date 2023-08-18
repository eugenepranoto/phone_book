import styled from '@emotion/styled';
import { TextSize } from './data';

interface TextProps {
    fontSize?: keyof typeof TextSize;
    color?: string;
    bold?: boolean;
}

const Text = styled.div<TextProps>`
  font-size: ${props => TextSize[props.fontSize || 'medium']};
  color: ${props => props.color || '#333'};
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
`;

export default Text;