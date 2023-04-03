import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="flex justify-end mt-4 mr-4" >
            <Link to="/admin">
                <button className="bg-violet-900 hover:bg-violet-600 text-white p-3 rounded-full">
                    Interdit aux enfants
                </button>
            </Link>
        </div>
    )
}

export default Header;