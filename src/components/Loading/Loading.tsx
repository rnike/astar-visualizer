import { HourglassBottom } from '@mui/icons-material';
import { Box } from '@mui/material';
import styled, { keyframes } from 'styled-components';

interface Props {
  isLoading: boolean;
}

export default function Loading({ isLoading }: Props) {
  if (!isLoading) {
    return null;
  }

  return (
    <S.Box display="flex">
      <S.Icon />
    </S.Box>
  );
}

const K = {
  rotate: keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
  `,
};

const S = {
  Box: styled(Box)`
    animation: ${K.rotate} 1s ease-out infinite;
  `,
  Icon: styled(HourglassBottom)`
    margin: auto;
  `,
};
