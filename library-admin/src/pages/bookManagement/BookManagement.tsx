import PrimarySearchAppBar from '../../layouts/header/Header';
import { Footer } from '../../layouts/footer/Footer';
import { Box, Button, Container, IconButton, List, ListItem, ListItemText, Tooltip, Typography } from '@mui/material';
import CustomizedBreadcrumbs from '../../components/CustomizedBreadcrumbs';
import FreeSoloCreateOptionDialog from '../../components/Autocomplete';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BasicMenu } from '../../components/BasicMenu';
import { useEffect, useState } from 'react';
import { BookAdd } from './BookAdd';
import BookModel from '../../models/BookModel';
import CategoryModel from '../../models/CategoryModel';
import ProgressCircularColor from '../../components/ProgressCircularColor';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { CategoryAdd } from './CategoryAdd';
import { BookTable } from './BookTable';

export const BookManagement = () => {
    const [openMenuBookAdd, setOpenMenuBookAdd] = useState(false);
    const [openMenuCategoryAdd, setOpenMenuCategoryAdd] = useState(false);
    const [books, setBooks] = useState<BookModel[]>([]);
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [trigger, setTrigger] = useState(false);

    const [isLoadingBooks, setIsLoadingBooks] = useState(true);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);

    const [httpError, setHttpError] = useState(null);

    const handleOpenMenuBookAdd = (isState: string) => {
        switch (isState) {
            case '/bookadd':
                setOpenMenuBookAdd(!openMenuBookAdd);
                setOpenMenuCategoryAdd(false);
                break;
            case '/categoryadd':
                setOpenMenuCategoryAdd(!openMenuCategoryAdd);
                setOpenMenuBookAdd(false);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl: string = `http://localhost:8000/books/getAllBooks`;

            const response = await fetch(baseUrl);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseDataBooks = responseJson.result;
            const loadedBooks: BookModel[] = [];
            for (const key in responseDataBooks) {
                loadedBooks.push({
                    id: responseDataBooks[key].id,
                    name: responseDataBooks[key].name,
                    author: {
                        id: responseDataBooks[key].author?.id,
                        name: responseDataBooks[key].author?.name,
                    },
                    publisher: {
                        id: responseDataBooks[key].publisher?.id,
                        name: responseDataBooks[key].publisher?.name,
                    },
                    category: {
                        id: responseDataBooks[key].category?.id,
                        name: responseDataBooks[key].category?.name,
                    },
                    coupon_codes: {
                        coupon_code_id: responseDataBooks[key].couponCodes?.couponCodeId,
                        coupon_code_count: responseDataBooks[key].couponCodes?.couponCodeCount,
                        coupon_code_sale_price: responseDataBooks[key].couponCodes?.couponCodeSalePrice,
                    },
                    created_at: responseDataBooks[key].createdAt,
                    updated_at: responseDataBooks[key].updatedAt,
                    description: responseDataBooks[key].description,
                    inventory_number: responseDataBooks[key].inventoryNumber,
                    language: responseDataBooks[key].language,
                    page_number: responseDataBooks[key].pageNumber,
                    price: responseDataBooks[key].pageNumber,
                    publishing_year: responseDataBooks[key].publishingYear,
                    ratings_star: responseDataBooks[key].ratingsStar,
                    size: responseDataBooks[key].size,
                    weight: responseDataBooks[key].weight,
                });
            }
            setBooks(loadedBooks);
            setIsLoadingBooks(false);
        };
        fetchBooks().catch((error) => {
            setIsLoadingBooks(false);
            setHttpError(error);
        });
    }, [trigger]);

    useEffect(() => {
        const fetchCategories = async () => {
            const baseUrl: string = `http://localhost:8000/categories`;

            const response = await fetch(baseUrl);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();
            const responseData = responseJson.result;
            const loadedCategories: CategoryModel[] = [];

            for (const key in responseData) {
                loadedCategories.push({
                    id: responseData[key].id,
                    name: responseData[key].name,
                    total_book: responseData[key].totalBooks,
                });
            }
            setCategories(loadedCategories);
            setIsLoadingCategories(false);
        };
        fetchCategories().catch((error) => {
            setIsLoadingCategories(false);
            setHttpError(error);
        });
    }, [trigger]);

    const handleRemoveBook = (bookId: number) => {
        // URL của tài nguyên mà bạn muốn xóa
        const url = `http://localhost:8000/books/${bookId}`;

        // Tùy chọn cho yêu cầu Fetch API
        const options = {
            method: 'DELETE', // Phương thức HTTP DELETE
            headers: {
                'Content-Type': 'application/json', // Đặt loại nội dung, nếu cần
                // Bạn có thể thêm các headers khác tại đây, nếu cần
            },
        };

        // Thực hiện yêu cầu HTTP DELETE
        fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    // Xử lý lỗi nếu có
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                // Xử lý kết quả trả về
                return response.json(); // Hoặc response.text() nếu kết quả trả về không phải JSON
            })
            .then(() => {
                alert('Bạn đã xóa sách thành công!');
                setTrigger(!trigger);
            })
            .catch((error) => {
                alert('Xóa sách không thành công');
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    if (isLoadingBooks || isLoadingCategories) {
        return <ProgressCircularColor />;
    }

    if (httpError) {
        return (
            <Box>
                <span>{httpError}</span>
            </Box>
        );
    }

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
                {!openMenuBookAdd && !openMenuCategoryAdd && (
                    <Box
                        sx={{
                            mb: 2, // Margin bottom để tạo khoảng cách dưới breadcrumbs nếu cần
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                mb: 2,
                            }}
                        >
                            Quản lý sách
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Box>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        mb: 2,
                                    }}
                                >
                                    Bảng sách
                                </Typography>
                                <Box
                                    sx={{
                                        mb: 2,
                                    }}
                                >
                                    <Box sx={{ display: 'flex' }}>
                                        <FreeSoloCreateOptionDialog />
                                        <Button variant="text">
                                            <SearchOutlinedIcon />
                                        </Button>
                                        <BasicMenu
                                            handleOpenMenuBookAdd={handleOpenMenuBookAdd}
                                            listMenu={[{ title: 'Thêm sách', link: '/bookadd' }]}
                                        >
                                            <MoreVertIcon />
                                        </BasicMenu>
                                    </Box>
                                </Box>

                                {/* Nội dung khác của bạn đặt ở đây */}
                                <BookTable books={books} handleRemoveBook={handleRemoveBook} />
                            </Box>
                        </Box>
                        <Box sx={{ width: '280px' }}>
                            <Box sx={{ display: 'flex' }}>
                                <Typography variant="h5">Danh mục</Typography>
                                <BasicMenu
                                    handleOpenMenuBookAdd={handleOpenMenuBookAdd}
                                    listMenu={[{ title: 'Thêm danh mục', link: '/categoryadd' }]}
                                >
                                    <MoreVertIcon />
                                </BasicMenu>
                            </Box>

                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                {categories.map((category) => (
                                    <li style={{ display: 'flex' }}>
                                        <ListItem
                                            key={category.id}
                                            disableGutters
                                            secondaryAction={<ListItemText primary={category.total_book} />}
                                        >
                                            <ListItemText primary={category.name} />
                                        </ListItem>
                                        <Button>
                                            <EditOutlinedIcon />
                                        </Button>
                                        <Button>
                                            <DeleteOutlineOutlinedIcon style={{ color: 'red' }} />
                                        </Button>
                                    </li>
                                ))}
                            </List>
                        </Box>
                    </Box>
                )}
                {openMenuBookAdd && <BookAdd handleOpenMenuBookAdd={handleOpenMenuBookAdd} />}
                {openMenuCategoryAdd && <CategoryAdd handleOpenMenuBookAdd={handleOpenMenuBookAdd} />}
            </Container>
            <Footer />
        </Box>
    );
};
