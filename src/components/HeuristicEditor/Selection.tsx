import { ArrowRight } from '@mui/icons-material';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import styled from 'styled-components';

interface Props {
  text: string;
  onClick: () => void;
}

export default function Selection(props: Props) {
  const { text, onClick } = props;

  return (
    <ListItem dense disablePadding>
      <ListItemButton onClick={onClick}>
        <S.ListItemIcon>
          <S.ArrowRight />
        </S.ListItemIcon>
        <S.ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}

const S = {
  ArrowRight: styled(ArrowRight)``,
  ListItemIcon: styled(ListItemIcon)`
    min-width: 0;
    margin-right: 4px;
  `,
  ListItemText: styled(ListItemText)`
    color: #414141;
  `,
};
