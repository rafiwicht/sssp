import React from 'react';


type TabPanelProps  = {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel: React.FunctionComponent<TabPanelProps> = ({children, index, value}: TabPanelProps) => {

    return (
        <div
            hidden={value !== index}
            id={`tabpanel-${index}`}
        >
            {children}
        </div>
    );
}

export default TabPanel;