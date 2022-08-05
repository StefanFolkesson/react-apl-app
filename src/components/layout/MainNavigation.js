import { Link } from "react-router-dom";
import { loadLS } from "../functions";
import classes from './MainNavigation.module.css';

function MainNavigation(){
    let user=loadLS('user');
    let admin=loadLS('admin');
    let    setup =
    <nav  className={classes.user}>
    <ul>
        <li>
            <Link to='/'>Startsida</Link>
        </li>
        <li>
            <Link to='/Logout'>Logga ut</Link>
        </li>
    </ul>
</nav>;

    if(admin==1){
    setup =
    <nav className={classes.admin}>
    <ul>
        <li>
            <Link to='/'>Startsida</Link>
        </li>
        <li>
            <Link to='/Elever'>Visa Elever</Link>
        </li>
        <li>
            <Link to='/Foretag'>Visa Företag</Link>
        </li>
        <li>
            <Link to='/Handledare'>Visa Handledare</Link>
        </li>
        <li>
            <Link to='/Perioder'>Visa Perioder</Link>
        </li>
        <li>
            <Link to='/Placerade'>Visa Placerade</Link>
        </li>
        <li>
            <Link to='/Logout'>Logga ut</Link>
        </li>
    </ul>
</nav>;
} 
    return (
        <header className={classes.header}>
            <span className={classes.logo}>User: {user} <a href="/client-apl-app">reload</a></span>
            {setup}
        </header>
    )

}

export default MainNavigation;

