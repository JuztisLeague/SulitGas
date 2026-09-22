import {Link} from "react-router-dom";
import {House, PenLine, Newspaper, Send} from "lucide-react";

export default function NavBar() {

    return (
        <nav className="bottom-nav">
            <Link to="/">
            <House size = {20}/>
            </Link>
            <Link to="/news">
            <Newspaper size = {20}/>
            </Link>
            <Link to="/report">
            <PenLine size = {20}/>
            </Link>
            <Link to="/ask">
            <Send size = {20}/>
            </Link>
        </nav>
    )
}