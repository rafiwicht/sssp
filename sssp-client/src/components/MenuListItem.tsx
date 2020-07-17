import React, {FunctionComponent} from 'react';
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import DashboardIcon from '@material-ui/icons/Dashboard';
import { withRouter, RouteComponentProps } from 'react-router-dom';

type MenuListItemProps = RouteComponentProps & {
    text: string,
    subpage: string,
    icon: any
}

const MenuListItem: React.FunctionComponent<MenuListItemProps> = ({text, subpage, icon, history}: MenuListItemProps) => {
    return (
        <ListItem button onClick={() => history.push(subpage)}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>
    );
}

export default withRouter(MenuListItem);