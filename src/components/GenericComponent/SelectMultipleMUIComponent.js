import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip(props) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    props.changeName(typeof value === 'string' ? value.split(',') : value)
    setPersonName(
      typeof value === 'string' ? value.split(',') : value);
  };

  let subjectItem = null;
  let majorItem = null;
  if(props.type === 'SUBJECT') {
      subjectItem = props.data.map(subject => {
        return (
          <MenuItem
            key={subject.id}
            value={subject.subjectName + '_' + subject.id}
            style={getStyles(subject.subjectName, personName, theme)}
            onChange={props.changeName}
          >
            {subject.subjectName}
          </MenuItem>
        )
      })
  } else if(props.type === "MAJOR") {
    majorItem = props.data.map(major => {
      return (
        <MenuItem
          key={major.id}
          value={major.name + '_' + major.id}
          style={getStyles(major.name, personName, theme)}
          onChange={props.changeName}
        >
          {major.name}
        </MenuItem>
      )
    })
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: `${props.width}` }}>
        <InputLabel id="demo-multiple-chip-label">{props.title}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {subjectItem && subjectItem}
          {majorItem && majorItem}
        </Select>
      </FormControl>
    </div>
  );
}
