import React, {useState, useEffect, useCallback} from 'react'
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    Container,
    Alert,
    TableRow,
    TablePagination,
    TableHead,
    TableContainer,
    TableCell,
    TableBody,
    Table,
    Paper,
    CircularProgress,
    Box,
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar
} from '@mui/material'

function DashboardLinks({auth}) {
    const [getLinks, setGetLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [openConfirm, setOpenConfirm] = useState(false)
    const [deletedId, setDeletedId] = useState(null)

    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success' // bisa 'success', 'error', 'warning', 'info'
    });

    const handleChangePage = useCallback((event, newPage) => {
        setPage(newPage)
    },[])

    const handleChangeRowsPerPage = useCallback((event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
    },[])

    useEffect(() => {
        const controller = new AbortController()
        const fetchData = async() => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(`/links/${auth.user?.id}`, {
                    signal: controller.signal,
                    params: {
                        limit: rowsPerPage,
                        page: page + 1
                    }
                })
                setGetLinks(response.data.result);
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }

        fetchData();
        return () => {controller.abort()}
    }, [auth, page, rowsPerPage])


    const handleOpenConfirmDialog = (id) => {
        setDeletedId(id)
        setOpenConfirm(true)
    }

    const handleCloseConfirmDialog = () => {
        setOpenConfirm(false)
        setDeletedId(null)
    }

    const columns = [
        { id: 'original_url', label: 'Original URL', minWidth: 230 },
        {
            id: 'short_url',
            label: 'Short URL',
            minWidth: 230,
            format: (value) => {
                const domain = window.location.host
                return domain + '/' + value
            }
        },
        {
            id: 'visits',
            label: 'Visits Received',
            minWidth: 100,
            format: (value) => {
                return `${value} Visited`
            }
        },
        {
            id: 'created_at',
            label: 'Created At',
            minWidth: 130,
            format: (value) => {
                const date = new Date(value);
                const options = {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                    timeZone: 'UTC'
                };

                const formatDate = date.toLocaleString('en-EN', options);
                return formatDate

            }
        },
        {
            id: 'action',
            label: 'Action',
            minWidth: 150,
            align: 'center',
            format: (value, row) => (
                <Button variant='contained' color='error' size='small' onClick={() => handleOpenConfirmDialog(row.id)}>
                    Delete
                </Button>
            )
        }
    ];

    const confirmDelete = useCallback(async () => {
        if (!deletedId) return;

        try {
            const response = await axios.delete(`/links/${deletedId}`)
            setGetLinks(prevLinks => ({
                ...prevLinks,
                data: prevLinks.data.filter(link => link.id !== deletedId)
            }))

            setNotification({
                open: true,
                message: response.data.message,
                severity: 'success'
            });

        } catch (error) {
            setNotification({
                open: true,
                message: error.response?.data?.message || 'Gagal menghapus data.',
                severity: 'error'
            });
        } finally {
            handleCloseConfirmDialog();
        }
    }, [deletedId, setGetLinks])

    const handleCloseNotification = (event, reason) => {
        // Jangan tutup jika user mengklik di luar snackbar
        if (reason === 'clickaway') {
            return;
        }
        // Set `open` menjadi false untuk menyembunyikan snackbar
        setNotification({ ...notification, open: false });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Links"/>
            {
                loading ? (
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
                        <CircularProgress size='3rem'/>
                    </Box>
                ) : (
                    <Box sx={{pt: 5, pb: 1, pl: 1, pr: 1}}>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                {
                                    error ? (
                                        <Container>
                                            <Alert severity='error' variant='filled' sx={{mt: 3}}>
                                                {error}
                                            </Alert>
                                        </Container>
                                    ) : (
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth }}
                                                    >
                                                    {column.label}
                                                    </TableCell>
                                                ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    getLinks.data?.map((row) => {
                                                        return (
                                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                                {
                                                                    columns.map((column) => {
                                                                        const value = row[column.id]
                                                                        return (
                                                                            <TableCell key={column.id}>
                                                                                {
                                                                                    // console.log(column.format)
                                                                                    column.format ? column.format(value, row) : value
                                                                                }
                                                                            </TableCell>
                                                                        )
                                                                    })
                                                                }
                                                            </TableRow>
                                                        )
                                                    })
                                                }
                                            </TableBody>
                                        </Table>
                                    )
                                }
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={getLinks.total ?? 0}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Box>
                )
            }
            <Dialog
                open={openConfirm}
                onClose={handleCloseConfirmDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Konfirmasi Penghapusan
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Apakah Anda yakin ingin menghapus link ini? Tindakan ini tidak dapat dibatalkan.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmDialog} color="primary">
                        Batal
                    </Button>
                    <Button onClick={confirmDelete} color="error" autoFocus>
                        Ya, Hapus
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={notification.open}
                autoHideDuration={6000} // Notifikasi akan hilang setelah 6 detik
                onClose={handleCloseNotification}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Posisi notifikasi
            >
                <Alert
                    onClose={handleCloseNotification}
                    severity={notification.severity}
                    sx={{ width: '100%' }}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </AuthenticatedLayout>
    )
}

export default DashboardLinks
