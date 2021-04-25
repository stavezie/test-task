import React from 'react';
import TableItem from "./TableItem/TableItem";

const Main = (props) => {


    return (
        <div>
            <TableItem
            users={props.users}
            setUsers={props.setUsers}
            checked={props.checked}
            setChecked={props.setChecked}
            />

        </div>
    );
};

export default Main;