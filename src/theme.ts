import { createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import palette from './palette';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    mini: true;
  }
}
// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    label1: true;
    label2: true;
  }
}
declare module '@mui/material/styles' {
  interface PaletteOptions{
    black?: SimplePaletteColorOptions;
    gray?: SimplePaletteColorOptions;
    white?: SimplePaletteColorOptions;
  }
  interface SimplePaletteColorOptions {
    60?: string;
    70?: string;
    80?: string;
    90?: string;
    100?: string;
  }
  interface TypographyVariants {
    label1: React.CSSProperties;
    label2: React.CSSProperties;
  }  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    label1?: React.CSSProperties;
    label2?: React.CSSProperties;
  }
}
let theme = createTheme({
  palette: palette
});

export default theme;
