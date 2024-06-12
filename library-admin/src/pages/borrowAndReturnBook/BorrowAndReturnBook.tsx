import { Box, Container, Grid, Typography } from '@mui/material';
import PrimarySearchAppBar from '../../layouts/header/Header';
import { Footer } from '../../layouts/footer/Footer';
import CustomizedBreadcrumbs from '../../components/CustomizedBreadcrumbs';
import { BorrowTable } from './BorrowTable';
import { GridColDef } from '@mui/x-data-grid';
import BorrowingFormModel from '../../models/BorrowingFormModel';
import { useEffect, useState } from 'react';

export const BorrowAndReturnBook = () => {
    const columsTableBorrow: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'date', headerName: 'Ngày mượn', width: 100 },
        { field: 'due_date', headerName: 'Ngày trả', width: 100 },
        { field: 'book', headerName: 'Sách', width: 100 },
        { field: 'user', headerName: 'Tài khoản mượn', width: 100 },
    ];

    const [borrowingForm, setBorrowingForm] = useState<BorrowingFormModel[]>([]);
    const [isLoadingBorrowingForm, setIsLoadingBorrowingForm] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchBorrowingForm = async () => {
            const baseUrl: string = `http:localhost:8000/`;
        };
    }, []);
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <PrimarySearchAppBar />
            <Container
                component="main"
                sx={{
                    flexGrow: 2,
                    py: 3,
                }}
            >
                <CustomizedBreadcrumbs />
                <Box
                    sx={{
                        mb: 2, // Margin bottom để tạo khoảng cách dưới breadcrumbs nếu cần
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            mb: 2,
                            mt: 1,
                        }}
                    >
                        Phiếu mượn
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12}></Grid>
                        <Grid item sm={12}></Grid>
                    </Grid>
                </Box>
                <Box
                    sx={{
                        mb: 2, // Margin bottom để tạo khoảng cách dưới breadcrumbs nếu cần
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            mb: 2,
                            mt: 1,
                        }}
                    >
                        Phiếu trả
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12}></Grid>
                        <Grid item sm={12}></Grid>
                    </Grid>
                </Box>
            </Container>
            <Footer />
        </Box>
    );
};
