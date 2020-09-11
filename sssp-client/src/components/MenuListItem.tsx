import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import { useHistory } from 'react-router-dom';

type MenuListItemProps = {
    text: string,
    subpage: string,
    icon: any
}

/**
 * Item in the menu
 * @param MenuListItemProps
 */

const MenuListItem: React.FunctionComponent<MenuListItemProps> = ({text, subpage, icon}: MenuListItemProps) => {
    let history = useHistory();
    return (
        <ListItem button onClick={() => history.push(subpage)}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>
    );
}

export default MenuListItem;