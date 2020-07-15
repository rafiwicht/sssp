import React from 'react';
import {Column} from 'material-table';
import Table from "../helper/Table";


interface Row {
    name: string;
    owner: string;
    state: string;
}

interface TableState {
    columns: Array<Column<Row>>;
    data: Row[];
}

const ServiceTable: React.FC = () => {
    const [state, setState] = React.useState<TableState>({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Owner', field: 'owner' },
            { title: 'State', field: 'state'},
        ],
        data: [
            { name: 'Kafka', owner: 'I253', state: 'present'},
            { name: 'Splunk', owner: 'I324', state: 'in creation'}
        ],
    });

    return (
        <Table
            title="Services"
            columns={state.columns}
            data={state.data}
            editable={{
                isEditable: (rowData: Row) => rowData.name === "Kafka",
                isDeletable: (rowData: Row) => rowData.name === "Splunk",
                onRowAdd: (newData: Row) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData: Row, oldData: Row) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData: Row) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
    );
}
export default ServiceTable;
