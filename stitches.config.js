import { createStitches } from '@stitches/react';
import {
  blue,
  green,
  yellow,
  red,
  mint,
  gray,
  grayA
} from '@radix-ui/colors';

export const { styled, getCssText } = createStitches({
  theme: {
    fonts: {
      system: 'system-ui',
    },
    space:{
      1: '8px',
      2: '15px',
      3: '22px',
      4: '32px',
    },
    fontSizes: {
      1: '13px',
      2: '15px',
      3: '17px',
    },
    radii:{
      1: '7px',
      2: '10px',
      3: '15px',
      4: '30px',
    },
    colors:{
      ...blue,
      ...green,
      ...yellow,
      ...red,
      ...mint,
      ...gray,
      ...grayA,
      scuPrimary:'#b30738',
      scuSecondary:'#862633',
    },
    shadows:{
      1:`0 0 7px ${gray.gray4}`,
      2:`0 0 12px ${gray.gray5}`,
      3:`0 0 20px ${gray.gray6}`,
    }
  },
});