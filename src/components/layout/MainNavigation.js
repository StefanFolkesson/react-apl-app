import { Link } from "react-router-dom";

import classes from './MainNavigation.module.css';

function MainNavigation(){
    return (
        <header className={classes.header}>
            <span className={classes.logo}> <a href="/client-apl-app">Vad vill du göra?</a></span>
            <nav>
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
                </ul>
            </nav>
        </header>
    )

}

export default MainNavigation;

