import React, { useEffect, useState } from 'react';
import Header from '../componenets/Header';
import { useNavigate } from "react-router-dom";
import { useProvider } from "../context/provider";
import './AddToken.css'

function AddToken() {

  const { tokenList, setTokenList, editableToken, setEditableToken } = useProvider();
  const navigate = useNavigate();

  const [newToken, setNewToken] = useState(
    {
      tokenName: '',
      tokenAmount: '',
    })
  const [repeatedToken, setRepeatedToken] = useState(false);

  const { tokenName, tokenAmount } = newToken;

  const handleChange = (e) => {
    setNewToken({ ...newToken, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("kleverTokens", JSON.stringify([...tokenList, newToken]))
    navigate('/')
  }

  useEffect(() => {
    if (tokenList.some(e => e.tokenName === newToken.tokenName)) {
      return setRepeatedToken(true)
    }
    return setRepeatedToken(false);
  }, [newToken])

  return (
    <>
      <Header />
      <div className='addToken'><h1 className='addtokenh1'>Add Token</h1>
        <div className='backButton'><button className="botaoBack" onClick={() => navigate('/')}>Voltar</button></div></div>
      <form onSubmit={(e) => handleSubmit(e)}
      ><div className='addInputs'>
          <div className='tokenNamediv'>
            <p className='tokenP'>Token</p>
            <input name="tokenName" type="text" value={tokenName} onChange={(e) => handleChange(e)} required />
            {repeatedToken && <p className='rToken'>Nome de token repetido!</p>}
          </div>
          <div className='tokenAmountdiv'>
            <p className='balanceP'>Balance</p>
            <input name="tokenAmount" type="number" value={tokenAmount} onChange={(e) => handleChange(e)} required />
          </div></div>
        <input type="submit" disabled={repeatedToken} value="Save" />
      </form>
    </>
  );
}

export default AddToken;
