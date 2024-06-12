import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props: PaperProps) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

export const BookRemoveDialog: React.FC<{ handleRemoveBook: any; bookId: number; bookName: string; children: any }> = (
    props,
) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button onClick={handleClickOpen}>{props.children}</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Xác nhận xóa sách
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {`Bạn có muốn xóa sách ${props.bookName} có mã là ${props.bookName}`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button
                        onClick={() => {
                            props.handleRemoveBook(props.bookId);
                            handleClose();
                        }}
                    >
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
