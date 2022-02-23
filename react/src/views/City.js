import { useParams } from "react-router-dom";

function City() {
    const params = useParams();

    return (
        <>
            <h1>City page</h1>
            <div>
                CITY_ID {params.id}
            </div>
        </>
    )
}

export default City;
