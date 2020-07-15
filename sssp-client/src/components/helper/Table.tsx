import React, {forwardRef} from 'react';
import MaterialTable, {Column, Icons} from 'material-table';
import {
    AddBox, ArrowUpward,
    Check, ChevronLeft,
    ChevronRight,
    Clear,
    DeleteOutline,
    Edit, FilterList,
    FirstPage,
    LastPage, Remove,
    SaveAlt, Search, ViewColumn
} from "@material-ui/icons";


const tableIcons : Icons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

interface TableProps {
    title: string;
    data: object[];
    columns: object[];
    editable: object;
}

const Table: React.FunctionComponent<TableProps> = (props: TableProps) => {
    return (
        <MaterialTable
            icons={tableIcons}
            {...props}/>
    );
}
export default Table;