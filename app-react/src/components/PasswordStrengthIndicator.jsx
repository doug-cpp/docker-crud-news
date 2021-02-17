import React from "react";

const PasswordStrengthIndicator = ({
    validity: { minChar, number, specialChar }
}) => {
    return (
        <div className="password-meter text-left mb-4">
            <p className="text-dark">A senha deverá conter:</p>
            <ul className="text-muted">
                <PasswordStrengthIndicatorItem
                    isValid={minChar}
                    text="Pelo menos 8 caracteres"
                />
                <PasswordStrengthIndicatorItem
                    isValid={number}
                    text="Pelo menos um número"
                />
                <PasswordStrengthIndicatorItem
                    isValid={specialChar}
                    text="Pelo menos um símbolo"
                />
            </ul>
        </div>
    );
};

const PasswordStrengthIndicatorItem = ({ isValid, text }) => {
    const highlightClass = isValid
        ? "text-success"
        : isValid !== null
        ? "text-danger"
        : "";
    return <li className={highlightClass}>{text}</li>;
};

export default PasswordStrengthIndicator;
