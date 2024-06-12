import { Box, Tooltip, Typography } from '@mui/material';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { FormCategory } from './FormCategory';
export const CategoryAdd: React.FC<{ handleOpenMenuBookAdd: any }> = (props) => {
    return (
        <Box
            sx={{
                mb: 2, // Margin bottom để tạo khoảng cách dưới breadcrumbs nếu cần
            }}
        >
            <Box>
                <Typography
                    variant="h4"
                    sx={{
                        mb: 2,
                    }}
                >
                    Thêm danh mục
                </Typography>
            </Box>
            <Box>
                <Tooltip title="Trở lại bảng sách" onClick={() => props.handleOpenMenuBookAdd('/categoryadd')}>
                    <ArrowBackIosOutlinedIcon style={{ marginLeft: '2rem', cursor: 'pointer' }} />
                </Tooltip>
            </Box>

            <Box>
                <FormCategory />
            </Box>
        </Box>
    );
};
