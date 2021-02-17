import React, { useState } from "react";
import FullPageLoader from "components/FullPageLoader";

const useFullPageLoader = () => {
    const [loading, setLoading] = useState(false);

    return [
        loading ? <FullPageLoader /> : null,
        () => setLoading(true), // Mostra o loader
        () => setLoading(false) // Esconde
    ];
};

export default useFullPageLoader;
