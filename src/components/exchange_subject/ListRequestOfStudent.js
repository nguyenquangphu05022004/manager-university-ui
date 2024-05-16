import * as React from 'react';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TableResponse from "./TableResponse";
import StudentRequestExchangeRegister from '../../services/StudentRequestExchangeRegister';
const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function ListRequestOfStudent(param) {
    const [open, setOpen] = React.useState(false);
    const [listRequest, setListRequest] = React.useState([]);
    React.useEffect(() => {
        StudentRequestExchangeRegister.getListByStudentExchangeRegisterId(param.studentExchangeRegisterId)
        .then(res => setListRequest(res.data))
        .catch(err=> alert("loi he thong"))
    }, [])


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    console.log(listRequest)

    return (
        <div>
            <button
                className={'btn btn-primary'}
                onClick={handleClickOpen}
            >Xem các yêu cầu
            </button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth = 'xl'

            >
                <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                    Danh sách các sinh viên gửi yêu cầu
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
                <DialogContent dividers>
                    <TableResponse
                        listRequest = {listRequest}
                    />
                </DialogContent>

            </BootstrapDialog>
        </div>
    );
}

export default ListRequestOfStudent;
