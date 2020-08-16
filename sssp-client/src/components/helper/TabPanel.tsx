import React from 'react';


type TabPanelProps  = {
    children?: React.ReactNode;
    index: number;
    tab: number;
}

const TabPanel: React.FunctionComponent<TabPanelProps> = ({children, index, tab}: TabPanelProps) => {

    return (
        <div
            hidden={tab !== index}
            id={`tabpanel-${index}`}
        >
            {children}
        </div>
    );
}

export default TabPanel;