import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    TextField,
    Box,
} from '@mui/material';
import CategoryModel from '../../models/CategoryModel';
import AuthorModel from '../../models/AuthorModel';
import PublisherModel from '../../models/PublisherModel';

const validationSchema = Yup.object({
    bookName: Yup.string().required('Tên sách là bắt buộc'),
    price: Yup.number().required('Giá là bắt buộc').positive('Giá phải là số dương'),
    year: Yup.number().required('Năm phát hành là bắt buộc').integer('Năm phát hành phải là số nguyên'),
    author: Yup.string().required('Tác giả là bắt buộc'),
    publisher: Yup.string().required('Nhà xuất bản là bắt buộc'),
    quantity: Yup.number().required('Số lượng là bắt buộc').integer('Số lượng phải là số nguyên'),
    status: Yup.string().required('Trạng thái là bắt buộc'),
    weight: Yup.number().required('Cân nặng là bắt buộc').positive('Cân nặng phải là số dương'),
    language: Yup.string().required('Ngôn ngữ là bắt buộc'),
    pages: Yup.number().required('Số trang là bắt buộc').integer('Số trang phải là số nguyên'),
    dimensions: Yup.string().required('Kích thước là bắt buộc'),
    description: Yup.string().required('Mô tả là bắt buộc'),
    category: Yup.string().required('Danh mục là bắt buộc'),
});

export default function FormBook() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [authors, setAuthors] = useState<AuthorModel[]>([]);
    const [publishers, setPublishers] = useState<PublisherModel[]>([]);

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
                });
            }

            setCategories(loadedCategories);
        };
        fetchCategories().catch((error) => {
            console.log(error.message);
        });
    }, []);

    useEffect(() => {
        const fetchAuthors = async () => {
            const baseUrl: string = `http://localhost:8000/authors`;
            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();
            const responseData = responseJson.result;
            const loadedAuthors: CategoryModel[] = [];
            for (const key in responseData) {
                loadedAuthors.push({
                    id: responseData[key].id,
                    name: responseData[key].name,
                });
            }

            setAuthors(loadedAuthors);
        };
        fetchAuthors().catch((error) => {
            console.log(error.message);
        });
    }, []);

    useEffect(() => {
        const fetchPublishers = async () => {
            const baseUrl: string = `http://localhost:8000/publishers`;
            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();
            const responseData = responseJson.result;
            const loadedPublishers: CategoryModel[] = [];
            for (const key in responseData) {
                loadedPublishers.push({
                    id: responseData[key].id,
                    name: responseData[key].name,
                });
            }

            setPublishers(loadedPublishers);
        };
        fetchPublishers().catch((error) => {
            console.log(error.message);
        });
    }, []);

    const formik = useFormik({
        initialValues: {
            bookName: '',
            price: '',
            year: '',
            author: '',
            publisher: '',
            quantity: '',
            status: '',
            weight: '',
            language: '',
            pages: '',
            dimensions: '',
            description: '',
            category: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={9}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '100ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={formik.handleSubmit}
                >
                    <TextField
                        id="bookName"
                        label="Tên sách"
                        variant="outlined"
                        value={formik.values.bookName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.bookName && Boolean(formik.errors.bookName)}
                        helperText={formik.touched.bookName && formik.errors.bookName}
                    />
                    <TextField
                        label="Giá"
                        id="price"
                        placeholder="10000"
                        sx={{ m: 1, width: '25ch' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">VNĐ</InputAdornment>,
                        }}
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.price && Boolean(formik.errors.price)}
                        helperText={formik.touched.price && formik.errors.price}
                    />
                    <TextField
                        id="year"
                        label="Năm phát hành"
                        variant="outlined"
                        value={formik.values.year}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.year && Boolean(formik.errors.year)}
                        helperText={formik.touched.year && formik.errors.year}
                    />
                    <FormControl
                        sx={{ m: 1, minWidth: 120 }}
                        size="small"
                        error={formik.touched.author && Boolean(formik.errors.author)}
                    >
                        <InputLabel id="author-label">Tác giả</InputLabel>
                        <Select
                            labelId="author-label"
                            id="author"
                            name="author"
                            value={formik.values.author}
                            label="Tác giả"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {authors.map((author) => (
                                <MenuItem value={author.id}>
                                    <em>{author.name}</em>
                                </MenuItem>
                            ))}
                        </Select>
                        {formik.touched.author && formik.errors.author && (
                            <Typography variant="caption" color="error">
                                {formik.errors.author}
                            </Typography>
                        )}
                    </FormControl>
                    <FormControl
                        sx={{ m: 1, minWidth: 120 }}
                        size="small"
                        error={formik.touched.publisher && Boolean(formik.errors.publisher)}
                    >
                        <InputLabel id="publisher-label">Nhà xuất bản</InputLabel>
                        <Select
                            labelId="publisher-label"
                            id="publisher"
                            name="publisher"
                            value={formik.values.publisher}
                            label="Nhà xuất bản"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {publishers.map((publisher) => (
                                <MenuItem value={publisher.id}>
                                    <em>{publisher.name}</em>
                                </MenuItem>
                            ))}
                        </Select>
                        {formik.touched.publisher && formik.errors.publisher && (
                            <Typography variant="caption" color="error">
                                {formik.errors.publisher}
                            </Typography>
                        )}
                    </FormControl>
                    <TextField
                        id="quantity"
                        label="Số lượng"
                        variant="outlined"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                        helperText={formik.touched.quantity && formik.errors.quantity}
                    />
                    <TextField
                        id="status"
                        label="Trạng thái"
                        variant="outlined"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.status && Boolean(formik.errors.status)}
                        helperText={formik.touched.status && formik.errors.status}
                    />
                    <TextField
                        label="Cân nặng"
                        id="weight"
                        placeholder="0.35"
                        sx={{ m: 1, width: '25ch' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                        }}
                        value={formik.values.weight}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.weight && Boolean(formik.errors.weight)}
                        helperText={formik.touched.weight && formik.errors.weight}
                    />
                    <TextField
                        id="language"
                        label="Ngôn ngữ"
                        variant="outlined"
                        value={formik.values.language}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.language && Boolean(formik.errors.language)}
                        helperText={formik.touched.language && formik.errors.language}
                    />
                    <TextField
                        id="pages"
                        label="Số trang"
                        variant="outlined"
                        value={formik.values.pages}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.pages && Boolean(formik.errors.pages)}
                        helperText={formik.touched.pages && formik.errors.pages}
                    />
                    <TextField
                        label="Kích thước"
                        id="dimensions"
                        placeholder="12x10"
                        sx={{ m: 1, width: '25ch' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                        }}
                        value={formik.values.dimensions}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.dimensions && Boolean(formik.errors.dimensions)}
                        helperText={formik.touched.dimensions && formik.errors.dimensions}
                    />
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    <FormControl
                        sx={{ m: 1, minWidth: 120 }}
                        size="small"
                        error={formik.touched.category && Boolean(formik.errors.category)}
                    >
                        <InputLabel id="category-label">Danh mục</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category"
                            name="category"
                            value={formik.values.category}
                            label="Danh mục"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {categories.map((category) => (
                                <MenuItem value={category.id}>
                                    <em>{category.name}</em>
                                </MenuItem>
                            ))}
                        </Select>
                        {formik.touched.category && formik.errors.category && (
                            <Typography variant="caption" color="error">
                                {formik.errors.category}
                            </Typography>
                        )}
                    </FormControl>
                    <TextField
                        id="description"
                        label="Mô tả"
                        multiline
                        rows={8}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                    <Button
                        type="reset"
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            formik.resetForm();
                            setSelectedFile(null);
                        }}
                    >
                        Reset
                    </Button>
                </Box>
            </Grid>
            <Grid item sm={3}>
                {selectedFile && (
                    <Card sx={{ maxWidth: 500 }}>
                        <CardMedia
                            sx={{ height: 200 }}
                            image={URL.createObjectURL(selectedFile)}
                            title="Selected File"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Selected file: {selectedFile.name}
                            </Typography>
                        </CardContent>
                    </Card>
                )}
            </Grid>
        </Grid>
    );
}
