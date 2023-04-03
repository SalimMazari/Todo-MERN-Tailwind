import { Link } from "react-router-dom";

const header = () => {
    return (
        <div className="flex justify-end mt-4 mr-4" >
            <Link to="/">
                <button className="bg-violet-900 hover:bg-violet-600 text-white p-3 rounded-full">
                    Revenir à la liste
                </button>
            </Link>
        </div>
    )
}

export default header;