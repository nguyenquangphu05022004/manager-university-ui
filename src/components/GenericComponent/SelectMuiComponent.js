import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";


function SelectMuiComponent(param) {

    let courseItem = null;
    let schoolYearItem = null;
    let semesterItem = null;
    let seasonItem = null;
    let subjectItem = null;
    let roomClassesItem = null;
    if(param.type === "SEMESTER") {
        semesterItem = param.data.map(dt => {
            return (
                <MenuItem
                    key={dt.id}
                    value={dt.id}
                    // style={getStyles(name, personName, theme)}
                    >
                    {dt.semesterName}
                </MenuItem>
            )
        })
    } else if(param.type === "SCHOOL_YEAR") {
        schoolYearItem = param.data.map(dt => {
            return (
                <MenuItem
                    key={dt.id}
                    value={dt.id}
                    // style={getStyles(name, personName, theme)}
                    >
                    {dt.name}
                </MenuItem>
            )
        }
    )
    } else if(param.type === 'COURSE') {
        courseItem = param.data.map(course => {
            return (
                <MenuItem
                    value={course.id}
                    key={course.id}
                >
                    Khóa {course.name}_{course.code}
                </MenuItem>
            )
        })
    } else if(param.type === 'SEASON') {
        seasonItem = param.data.map(season => {
            return (
                <MenuItem
                    value={season.id}
                    key={season.id}
                >
                    {season.nameSeason}
                </MenuItem>
            )
        })
    } else if(param.type==="SUBJECT") {
        subjectItem = param.data.map(subject => {
            return (
                <MenuItem
                    value={subject.id}
                    key={subject.id}
                >
                    {subject.subjectName}
                </MenuItem>
            )
        })
    } else if(param.type==="ROOM_CLASS") {
        roomClassesItem = param.data.map(roomClass => {
            return (
                <MenuItem
                    value={roomClass.id}
                    key={roomClass.id}
                >
                    {roomClass.name}
                </MenuItem>
            )
        })
    }



    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{minWidth: `${param.width}`}} disabled={param.isDisable}>
                <InputLabel id="demo-simple-select-label">{param.title}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label={param.title}
                    onChange={param.function}
                    defaultValue={param.defaultValue}
                >
                    {semesterItem != null && semesterItem}
                    {schoolYearItem != null && schoolYearItem}
                    {courseItem != null && courseItem}
                    {seasonItem != null && seasonItem}
                    {subjectItem != null && subjectItem}
                    {roomClassesItem != null &&  roomClassesItem}
                </Select>
            </FormControl>
        </Box>
    )
}

export default SelectMuiComponent;