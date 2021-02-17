import React from "react";
import Header from "components/Header";
import { useHistory } from "react-router-dom";

const PageNotFound = () => {
    const history = useHistory();

    return (
        <>
            <Header title="Página não encontrada" />

            <div className="row w-100 pt-4">
                <div className="col text-center mt-4">
                    <h3>Esta página não existe</h3>
                    <button className="btn btn-dark btn-block"
                        onClick={() => history.push("/start")}
                    >
                        Voltar à página principal
                    </button>
                </div>
            </div>
        </>
    );
};

export default PageNotFound;
