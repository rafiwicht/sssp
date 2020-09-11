import React from 'react';


type TabPanelProps  = {
    children?: React.ReactNode;
    index: number;
    value: number;
}

/**
 * Helper component to create tabed components
 * @param AppsInputProps
 */
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