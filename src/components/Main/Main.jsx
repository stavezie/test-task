import React from 'react';
import TableItem from "./TableItem/TableItem";

const Main = (props) => {


    return (
        <div>
            <TableItem
            users={props.users}
            setUsers={props.setUsers}
            currency={props.currency}
            setCurrency={props.setCurrency}
            />

        </div>
    );
};

export default Main;