{
    /* Navigation Menu */
}
<Drawer
    className={classes.drawer}
    variant="permanent"
    classes={{
        paper: classes.drawerPaper,
    }}
    anchor="left"
>
    <List>
        {/* All Forums */}
        {usersForums.map((forum) => {
            const forumLink = `/forum/${forum.id}`;
            const forumName = forum.name;

            return (
                <ListItem key={forum.id} className={classes.listItem}>
                    <IconButton disableRipple disableFocusRipple size="small">
                        <Link to={forumLink}>
                            <Avatar alt={forumName} src="" />
                        </Link>
                    </IconButton>
                </ListItem>
            );
        })}

        {/* Join/Create List Item */}
        <ListItem className={classes.listItem}>
            <IconButton disableRipple disableFocusRipple size="small">
                <Link to="/join">
                    <Avatar>
                        <AddIcon />
                    </Avatar>
                </Link>
            </IconButton>
        </ListItem>
    </List>
</Drawer>;
