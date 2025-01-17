// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';
import { ThemeMode } from 'config';

// third-party
import { presetDarkPalettes, presetPalettes } from '@ant-design/colors';

// assets
import colorLayout from './theme-color.svg';
import { useState } from 'react';
import useConfig from 'hooks/useConfig';

// ==============================|| CUSTOMIZATION - COLOR SCHEME ||============================== //

export default function ColorScheme() {
  const theme = useTheme();

  const { mode, presetColor, onChangePresetColor, customColors: configCustomColors, onChangeCustomColors } = useConfig();

  const colors = mode === ThemeMode.DARK ? presetDarkPalettes : presetPalettes;
  const { blue, grey } = colors;
  const [customColors, setCustomColors] = useState(() => {
    const primary = configCustomColors?.[0] ?? blue[5];
    const secondary = configCustomColors?.[1] ?? grey[5];
    return [primary, secondary];
  });

  const colorOptions = [
    {
      id: 'default',
      primary: blue[5],
      lighter: blue[0],
      label: 'Default',
      shadow: `0 0 0 2px ${alpha(blue[5], 0.2)}`
    },
    {
      id: 'theme1',
      primary: mode === ThemeMode.DARK ? '#305bdd' : '#3366FF',
      lighter: mode === ThemeMode.DARK ? '#1c2134' : '#D6E4FF',
      label: 'Theme 1',
      shadow: `0 0 0 2px ${alpha(mode === ThemeMode.DARK ? '#305bdd' : '#3366FF', 0.2)}`
    },
    {
      id: 'theme2',
      primary: mode === ThemeMode.DARK ? '#655ac8' : '#7265E6',
      lighter: mode === ThemeMode.DARK ? '#222130' : '#EEEDFC',
      label: 'Theme 2',
      shadow: `0 0 0 2px ${alpha(mode === ThemeMode.DARK ? '#655ac8' : '#7265E6', 0.2)}`
    },
    {
      id: 'theme3',
      primary: mode === ThemeMode.DARK ? '#0a7d3e' : '#068e44',
      lighter: mode === ThemeMode.DARK ? '#1a231f' : '#E6F3EC',
      label: 'Theme 3',
      shadow: `0 0 0 2px ${alpha(mode === ThemeMode.DARK ? '#0a7d3e' : '#068e44', 0.2)}`
    },
    {
      id: 'theme4',
      primary: mode === ThemeMode.DARK ? '#5d7dcb' : '#3c64d0',
      lighter: mode === ThemeMode.DARK ? '#1d212d' : '#f0f6ff',
      label: 'Theme 4',
      shadow: `0 0 0 2px ${alpha(mode === ThemeMode.DARK ? '#5d7dcb' : '#3c64d0', 0.2)}`
    },
    {
      id: 'theme5',
      primary: mode === ThemeMode.DARK ? '#d26415' : '#f27013',
      lighter: mode === ThemeMode.DARK ? '#32221a' : '#fff4e6',
      label: 'Theme 5',
      shadow: `0 0 0 2px ${alpha(mode === ThemeMode.DARK ? '#d26415' : '#f27013', 0.2)}`
    },
    {
      id: 'theme6',
      primary: mode === ThemeMode.DARK ? '#288d99' : '#2aa1af',
      lighter: mode === ThemeMode.DARK ? '#1c2628' : '#e1f0ef',
      label: 'Theme 6',
      shadow: `0 0 0 2px ${alpha(mode === ThemeMode.DARK ? '#288d99' : '#2aa1af', 0.2)}`
    },
    {
      id: 'theme7',
      primary: mode === ThemeMode.DARK ? '#05934c' : '#00a854',
      lighter: mode === ThemeMode.DARK ? '#1a2721' : '#d1e8d99c',
      label: 'Theme 7',
      shadow: `0 0 0 2px ${alpha(mode === ThemeMode.DARK ? '#05934c' : '#00a854', 0.2)}`
    },
    {
      id: 'theme8',
      primary: mode === ThemeMode.DARK ? '#058478' : '#009688',
      lighter: mode === ThemeMode.DARK ? '#1a2524' : '#c1d6d066',
      label: 'Theme 8',
      shadow: `0 0 0 2px ${alpha(mode === ThemeMode.DARK ? '#058478' : '#009688', 0.2)}`
    },
    {
      id: 'kumoship',
      primary: mode === ThemeMode.DARK ? '#305bdd' : '#48a0d7',
      lighter: mode === ThemeMode.DARK ? '#1c2134' : '#D6E4FF',
      label: 'Kumoship',
      shadow: `0 0 0 2px ${alpha(mode === ThemeMode.DARK ? '#305bdd' : '#3366FF', 0.2)}`
    }
  ];

  const handlePresetColorChange = (event) => {
    console.log(event.target.value,"event.target.value")
    onChangePresetColor(event.target.value);
  };

  return (
    <RadioGroup row aria-label="payment-card" name="payment-card" value={presetColor} onChange={handlePresetColorChange}>
      <Grid container spacing={2} sx={{ ml: 0 }}>
        {colorOptions.map((color, index) => (
          <Grid item key={index}>
            <FormControlLabel
              control={<Radio value={color.id} sx={{ display: 'none' }} />}
              sx={{ display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
              label={
                <MainCard
                  content={false}
                  sx={{ bgcolor: presetColor === color.id ? color.lighter : 'secondary.lighter', p: 1 }}
                  border={false}
                  boxShadow
                  shadow={presetColor === color.id ? color.shadow : theme.customShadows.z1}
                >
                  <Stack spacing={1.5} alignItems="center">
                    <CardMedia
                      component="img"
                      src={colorLayout}
                      alt="Vertical"
                      sx={{
                        border: '1px solid',
                        borderColor: color.primary,
                        borderRadius: 1,
                        bgcolor: color.primary,
                        width: 40,
                        height: 40
                      }}
                    />
                    <Typography variant="caption">{color.label}</Typography>
                  </Stack>
                </MainCard>
              }
            />
          </Grid>
        ))}
        {true && (
          <>
            <Grid item>
              <FormControlLabel
                control={<Radio value={'custom'} sx={{ display: 'none' }} />}
                sx={{ display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
                label={
                  <MainCard
                    content={false}
                    sx={{ bgcolor: presetColor === 'custom' ? blue[0] : 'secondary.lighter', p: 1 }}
                    border={false}
                    boxShadow
                    shadow={presetColor === 'custom' ? `0 0 0 2px ${alpha(customColors[0], 0.2)}` : theme.customShadows.z1}
                  >
                    <Stack spacing={1.5} alignItems="center">
                      <CardMedia
                        component="img"
                        src={colorLayout}
                        alt="Vertical"
                        sx={{
                          border: '1px solid',
                          borderColor: customColors[0],
                          borderRadius: 1,
                          bgcolor: customColors[0],
                          width: 40,
                          height: 40
                        }}
                      />
                      <Typography variant="caption">Custom</Typography>
                    </Stack>
                  </MainCard>
                }
              />
            </Grid>
            {presetColor === 'custom' && (
              <>
                <Grid item>
                  <Typography>Primary</Typography>
                  <input
                    type="color"
                    name="custom-theme"
                    id="custom-theme"
                    defaultValue={customColors[0]}
                    onBlur={(e) => {
                      const values = JSON.parse(JSON.stringify(customColors));
                      values[0] = e.target.value;
                      setCustomColors(values);
                      onChangeCustomColors(values);
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography>Secondary</Typography>
                  <input
                    type="color"
                    name="custom-theme"
                    id="custom-theme"
                    defaultValue={customColors[1]}
                    onBlur={(e) => {
                      const values = JSON.parse(JSON.stringify(customColors));
                      values[1] = e.target.value;
                      setCustomColors(values);
                      onChangeCustomColors(values);
                    }}
                  />
                </Grid>
              </>
            )}
          </>
        )}
      </Grid>
    </RadioGroup>
  );
}
