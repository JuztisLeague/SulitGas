import {NavLink} from "react-router-dom";
import {House, PenLine, Newspaper, Send} from "lucide-react";

export default function NavBar() {

    return (
        <nav className="bottom-nav">
            <NavLink to="/" end className={({isActive}) => (isActive ? "active" : "")}>
            <House size = {20}/>
            </NavLink>
            <NavLink to="/news" className={({isActive}) => (isActive ? "active" : "")}>
            <Newspaper size = {20}/>
            </NavLink>
            <NavLink to="/report" className={({isActive}) => (isActive ? "active" : "")}>
            <PenLine size = {20}/>
            </NavLink>
            <NavLink to="/ask" className={({isActive}) => (isActive ? "active" : "")}>
            <Send size = {20}/>
            </NavLink>
        </nav>
    )
}