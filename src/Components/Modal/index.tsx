import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

import Box from '../Box';
import Text from '../Text';
import Button from '../Button';

import { Color } from '../../Constants/Color';

interface ModalProps {
    show?: boolean
    title?: string
    handleClose: () => void
}

interface ModalContainerProps {
    show: boolean;
}

const ModalContainer = styled.div<ModalContainerProps>`
  display: ${props => (props.show ? 'block' : 'none')};
  position: fixed;
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
  background: #ffffff;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1000;
`;


export default function Modal({ children, show = false, title = '', handleClose }: PropsWithChildren<ModalProps>): JSX.Element {
    return (
        <ModalContainer show={show} data-testid="modal-container">
            <Box justifyContent="space-between" alignItems="center" pad="medium" style={{ borderBottom: `1px solid ${Color.SmokeGrey}` }}>
                <Box justifyContent="center">
                    <Text fontSize="large" bold>{title}</Text>
                </Box>
                <Button onClick={handleClose} data-testid="btn-close-modal" link>
                    <Text fontSize="large" color={Color.Secondary}>&#x2715;</Text>
                </Button>
            </Box>
            <Box pad="medium">
                {children}
            </Box>
        </ModalContainer>
    );
}
