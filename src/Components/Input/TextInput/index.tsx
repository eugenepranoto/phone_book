import styled from '@emotion/styled';

import { Color } from '../../../Constants/Color';

export const TextInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: .5em;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${Color.Primary};
  }
`;

export default TextInput;
