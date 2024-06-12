import { Box, Tooltip, Typography } from '@mui/material';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import FormBook from './FormBook';

export const BookAdd: React.FC<{ handleOpenMenuBookAdd: any }> = (props) => {
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
                    Thêm sách
                </Typography>
            </Box>
            <Box>
                <Tooltip title="Trở lại bảng sách" onClick={() => props.handleOpenMenuBookAdd('/bookadd')}>
                    <ArrowBackIosOutlinedIcon style={{ marginLeft: '2rem', cursor: 'pointer' }} />
                </Tooltip>
            </Box>

            <Box>
                <FormBook />
            </Box>
        </Box>
    );
};
