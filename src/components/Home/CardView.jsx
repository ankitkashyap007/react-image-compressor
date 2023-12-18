import { memo } from 'react'
import { Link, useLocation } from "react-router-dom";

function CardView(props) {
    const { title, url } = props;
    const location = useLocation();
    const rootUrl = location.pathname.split("/")[0];
    return (
        <Link to={`${rootUrl}${url}`} className="p-2 mx-2 my-3 font-bold text-center border-2 border-gray-200 hover:bg-indigo-500 hover:text-white rounded-md">{title}</Link>
    )
}
export default memo(CardView)