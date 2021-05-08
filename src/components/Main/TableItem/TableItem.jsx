import React from 'react';
import axios from "axios";
import classes from '../TableItem/TableItem.module.css'
import '../TableItem/TableItem.css'
import { ImBin, ImPencil } from 'react-icons/im'
const TableItem = (props) => {

    // Константы.
    const users = props.users;
    const setUsers = props.setUsers;
    const currency = props.currency;
    const setCurrency = props.setCurrency;
    window.users = users;

    // Запрос на сервер. (Получение списка юзеров)
    const getUsersData = () => {
        axios.get('https://api.npoint.io/324f4ca2cdd639760638').then(resolve => {
            setUsers(resolve.data)
        })
    }

    // Модификация полей юзеров для удобства.
    if (users.length !== 0) {
        users.forEach(user => {
            user.id = users.indexOf(user) + 1;
            user.isChecked = !user.isChecked;
        })
    }

    // Запрос на сервер. (Получение актуального курса валлюты)
    const getCurrencyData = () => {
        axios.get('https://api.ratesapi.io/api/latest').then(resolve => {
            setCurrency(resolve.data.rates.USD)
        })
    }

    // Хук для выполнения побочных эффектов.
    React.useEffect(() => {
        getUsersData();
        getCurrencyData();
    }, [])


    // Функция удаления юзера по иконке корзины.
    function removeUser(userId) {
        const removeArr = users.filter(user => user.id !== userId)
        setUsers(removeArr)
    }

    // Функция расчёта зарплаты евро -> доллары.
    function setSalary(userSalary) {
        return Math.floor(userSalary * currency)
    }

    // Функция реализующая работу чекбоксов.
    function handleCheckChildElement(event) {
        users.forEach(user => {
            if (user.id === parseFloat(event.target.value)) {
                user.isChecked = !user.isChecked;
            }
        })
        setUsers([...users])
    }

    // Функция конвертертирующая unix в года жизни.
    function timeConverter(UNIX_timestamp) {
        let personDate = new Date(UNIX_timestamp * 1000);
        let personYear = personDate.getFullYear();
        let today = new Date();
        let todayYear = today.getFullYear();
        return todayYear - personYear;
    }

    // Функция конвертертирующая футы в метры и сантиметры.
    function FeetConverter(userHeight) {
        let split = userHeight.split("'")
        let feet = split[0];
        let inches = split[1].replace(/['"]+/g, '');
        let totalCentimeters = Math.floor(30.48 * feet + inches * 2.54)
        let centimeters = totalCentimeters % 100 + ' см ';
        let meters = Math.floor(totalCentimeters / 100) + ' м '
        return meters + centimeters;
    }

    // Функция конвертертирующая футы в килограмы.
    function WeightConverter(userWeight) {
        return Math.floor(userWeight / 2.205) + ' кг';
    }



    return (
        <div>
            {users.map(user => {
                return(
                    <div className={`${classes.user} ${user.isChecked ? 'TableItem_user__spec' : ''}`} key={user.id}>
                        <label className={classes.label}>
                            <input type='checkbox' className={classes.user_checkbox} checked={user.isChecked} value={user.id} onChange={handleCheckChildElement}/>
                            <span className={classes.fake}>

                            </span>
                        </label>
                        <div className={classes.user_id}>{user.id}</div>
                        <div className={classes.user__name}>{user.first_name} {user.last_name}</div>
                        <div className={classes.user__birth}>{timeConverter(user.date_of_birth)}</div>
                        <div className={classes.user__height}>{FeetConverter(user.height)}</div>
                        <div className={classes.user__weight}>{WeightConverter(user.weight)}</div>
                        <div className={classes.user__salary}>{setSalary(user.salary)} $</div>
                        <div>
                            <button className={classes.editBtn}>
                                <ImPencil className={classes.edit}/>
                            </button>
                            <button onClick={() => removeUser(user.id)} className={classes.removeBtn}>
                                <ImBin className={classes.bin}/>
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default TableItem;