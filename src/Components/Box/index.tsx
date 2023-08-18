import styled from '@emotion/styled';

import { boxPadding } from './data';

interface BoxProps {
    direction?: 'row' | 'column';
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
    alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
    wrap?: boolean;
    rowGap?: string;
    columnGap?: string;
    pad?: keyof typeof boxPadding
    background?: string;
}

const Box = styled.div<BoxProps>`
  display: flex;
  width: 100%;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: ${props => props.justifyContent || 'flex-start'};
  align-items: ${props => props.alignItems || 'stretch'};
  flex-wrap: ${props => (props.wrap ? 'wrap' : 'nowrap')};
  row-gap: ${props => props.rowGap || '0'};
  column-gap: ${props => props.columnGap || '0'};
  padding: ${props => (props.pad ? boxPadding[props.pad] : '0')};
  background: ${props => props.background || 'none'};
`;

export default Box;
