import { DataGrid, GridColDef } from '@mui/x-data-grid';
import RowsBorrow from '../../utils/RowsBorrow';

export const BorrowTable: React.FC<{ columns: GridColDef[]; rows: RowsBorrow[] }> = (props) => {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={props.rows}
                columns={props.columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
};
