import { Minimize } from '@mui/icons-material';
import { Stack, Box, Typography, IconButton } from '@mui/material';
import { PropsWithChildren } from 'react';
import Draggable, { DraggableProps } from 'react-draggable';
import styled from 'styled-components';

interface Props {
  title: string;
  onMinimize: () => void;
  defaultPosition?: DraggableProps['defaultPosition'];
}

export default function ChildWindow(props: PropsWithChildren<Props>) {
  const {
    onMinimize,
    children,
    title,
    defaultPosition = { x: 0, y: 0 },
  } = props;

  return (
    <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={defaultPosition}
      // @ts-expect-error
      position={null}
      grid={[25, 25]}
      scale={1}
    >
      <Stack
        boxShadow="3px 5px 10px #bfbfbf"
        bgcolor="white"
        zIndex={9999}
        position="fixed"
      >
        <S.Handle direction="row" className="handle">
          <Box flex={1} />
          <S.Typography>{title}</S.Typography>
          <Box display="flex" justifyContent="flex-end" flex={1}>
            <IconButton disableRipple component="span" onClick={onMinimize}>
              <S.Minimize />
            </IconButton>
          </Box>
        </S.Handle>
        {children}
      </Stack>
    </Draggable>
  );
}

const S = {
  Handle: styled(Stack)`
    background-color: #e8e8e8;
    height: 30px;
    border: solid #c1c1c1;
    border-width: 0 0 1px 0;
  `,
  Minimize: styled(Minimize)`
    color: #8a8a8a;
  `,
  Typography: styled(Typography)`
    color: #8a8a8a;
    margin: auto 0 auto 4px;
  `,
};
