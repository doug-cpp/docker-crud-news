import React, { useState, useEffect } from "react";
import Header from "components/Header";
import { useDispatch, connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePasswordToggle from "hooks/usePasswordToggle";
import PasswordStrengthIndicator from "components/PasswordStrengthIndicator";
import { addUser, getAuth } from "app-redux/actions/authActions";

const isNumberRegx = /\d/;
const specialCharacterRegx = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

// Monitora se algum erro de servidor ocorreu ao tentar cadastrar/autenticar:
const mapStateToProps = state => {
    return state.authUser
}

const Signup = props => {

    const [PasswordInputType, ToggleIcon] = usePasswordToggle();
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [formValidationMessage, setFormValidationMessage] = useState('');

    const [passwordValidity, setPasswordValidity] = useState({
        minChar: null,
        number: null,
        specialChar: null
    });


    const dispatch = useDispatch();

    const [inputs, setInputs] = useState(
        {
            name: '',
            email: '',
            password: ''
        });

    useEffect(() => {
        if(props.id) {
            setFormValidationMessage('Seu cadastro foi efetuado com sucesso! Agora é só entrar! ;)');
        } else {
            setFormValidationMessage(props.error || '');
        }
    },[props.error, props.id]);

    const [toggleSignInSignUp, setToggleSignInUp] = useState(props.signType || 'signin');
    
    const toggleSignInUp = () => {
        setToggleSignInUp(toggleSignInSignUp === 'signup' ? 'signin' : 'signup');
    }

    const updateFormValue = ({ target: { name, value } }) =>
        setInputs(inputObj => ({ ...inputObj, [name]: value.toString().trim() }));

    const submitForm = (e) => {
        e.preventDefault();
        if (!formValid()) {
            return;
        }
        switch(toggleSignInSignUp) {
            case 'signup':
                dispatch(addUser({ ...inputs }));
                break;
                
            case 'signin':
                dispatch(getAuth({ ...inputs }));
                break;

            default:
                break;    
        }
        
        setToggleSignInUp('signin');
    };

    const formValid = () => {
        const nameValid = (inputs.name && inputs.name.length > 2 && inputs.name.length < 50)
                    || toggleSignInSignUp === 'signin' ;
        const emailValid = inputs.email && inputs.email.length > 7 && inputs.email.length < 50;
        const passdValid = inputs.password && inputs.password.length > 7
            && passwordValidity.minChar && passwordValidity.number && passwordValidity.specialChar;

        setFormValidationMessage('');

        if(!nameValid) {
            setFormValidationMessage('Digite um nome válido')
        } else if(!emailValid) {
            setFormValidationMessage('Digite um email válido')
        } else if(!passdValid) {
            setFormValidationMessage('Digite uma senha válida')
        }

        if (props.error) {
            setFormValidationMessage(props.error);
        }

        return nameValid && emailValid && passdValid;
    }

    const onChangePassword = () => {
        setPasswordValidity({
            minChar: inputs.password.length >= 8 ? true : false,
            number: isNumberRegx.test(inputs.password) ? true : false,
            specialChar: specialCharacterRegx.test(inputs.password) ? true : false
        });
    };

    return (
        <>
            <Header title="" />
            <div className="login-container">
                <center>

                    <div className="card bg-light sign-up-card">
                        <article
                            className="card-body mx-auto"
                            style={{ maxWidth: "400px" }}
                        >
                            <h4 className="card-title mt-3 text-center">
                                {toggleSignInSignUp === 'signin' ? 'Digite suas credenciais' : 'Crie uma conta'}
                            </h4>
                            <p className="text-center">
                                Você terá acesso ao<br /><strong>CRUD de Notícias ;)</strong>
                            </p>

                            <form onSubmit={submitForm}>
                                { toggleSignInSignUp !== 'signin' &&
                                    <div className="form-group input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <FontAwesomeIcon icon="user" />
                                            </span>
                                        </div>
                                        
                                        <input
                                            name="name"
                                            value={inputs.name}
                                            className="form-control"
                                            placeholder="Nome"
                                            type="text"
                                            required
                                            minLength={4}
                                            maxLength={40}
                                            autoFocus
                                            onChange={e => updateFormValue(e)}
                                        />
                                    </div>
                                }
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon="envelope" />
                                        </span>
                                    </div>
                                    <input
                                        name="email"
                                        className="form-control"
                                        placeholder="Email"
                                        type="email"
                                        required
                                        minLength={8}
                                        maxLength={40}
                                        value={inputs.email}
                                        onChange={e => updateFormValue(e)}
                                    />
                                </div>

                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon="lock" />
                                        </span>
                                    </div>
                                    <input
                                        className="form-control"
                                        placeholder="Senha"
                                        name="password"
                                        minLength={8}
                                        maxLength={40}
                                        required
                                        type={PasswordInputType}
                                        value={inputs.password}
                                        onFocus={() => setPasswordFocused(true)}
                                        onChange={e => {
                                            onChangePassword(e.target.value)
                                            updateFormValue(e)
                                        }}
                                        onKeyDown={e => onChangePassword(e.target.value)}
                                        onKeyUp={e => onChangePassword(e.target.value)}
                                    />
                                    <span className="password-toogle-icon">
                                        {ToggleIcon}
                                    </span>
                                </div>

                                {passwordFocused && toggleSignInSignUp !== 'signin' &&
                                    <PasswordStrengthIndicator
                                        validity={passwordValidity}
                                    />
                                }

                                <div className="form-group">
                                    <button
                                        type="submit"
                                        className="btn btn-dark btn-block"
                                    >{ toggleSignInSignUp === 'signin' ? 'Entrar' : 'Cadastrar'}
                                    </button>
                                </div>
                                <p className="text-center">
                                    { toggleSignInSignUp === 'signin' ? 'Ainda não tem conta?' : 'Já é um usuário cadastrado?' }
                                    <button
                                        type="button"
                                        onClick={e => toggleSignInUp()}
                                        className="btn btn-flat">
                                            { toggleSignInSignUp === 'signin' ? 'Cadastre-se' : 'Entrar'}
                                    </button>{" "}
                                </p>
                            </form>
                            <label className="invalid-form">{formValidationMessage}</label>
                        </article>
                    </div>
                </center>
            </div>
        </>
    );
};

export default connect(mapStateToProps)(Signup);
