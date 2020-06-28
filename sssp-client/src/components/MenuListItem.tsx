import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import DashboardIcon from '@material-ui/icons/Dashboard';
import { withRouter, RouteComponentProps } from 'react-router-dom';

type MenuListItemProps = RouteComponentProps & {
    text: string
}

const MenuListItem: React.FunctionComponent<MenuListItemProps> = ({text, history}: MenuListItemProps) => {
    return (
        <ListItem button onClick={() => history.push("/")}>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>
    );
}

export default withRouter(MenuListItem);