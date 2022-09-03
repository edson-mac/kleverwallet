import React, { useEffect, useState } from 'react';
import Header from '../componenets/Header';
import { useNavigate } from "react-router";
import { useProvider } from "../context/provider";
import Swal from 'sweetalert2'
import './EditToken.css'

function EditToken() {

  const { tokenList, setTokenList, editableToken, setEditableToken } = useProvider();

  const { tokenName, tokenAmount, tokenIndex } = editableToken;

  const [repeatedToken, setRepeatedToken] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEditableToken({ ...editableToken, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newToken = { tokenName, tokenAmount };
    const newTokenList = [...tokenList]
    newTokenList.splice(tokenIndex, 0, newToken);
    localStorage.setItem("kleverTokens", JSON.stringify(newTokenList))
    return navigate('/')
  }

  const handleDelete = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your Token has been deleted.',
          'success'
        )
        navigate('/')
        return localStorage.setItem("kleverTokens", JSON.stringify(tokenList))
      }
    })
  }

  useEffect(() => {
    if (tokenList.some(e => e.tokenName === editableToken.tokenName)) {
      return setRepeatedToken(true)
    }
    return setRepeatedToken(false);
  }, [editableToken])
  return (
    <>
      <Header />
      <div className='addToken'><h1 className='addtokenh1'>Edit Token</h1>
        <div className='backButton'><button className="botaoBack" onClick={() => navigate('/')}>Voltar</button></div></div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className='addInputs'>
          <div className='tokenNamediv'>
            <p className='tokenP'>Token</p>
            <input name="tokenName" type="text" value={tokenName} onChange={(e) => handleChange(e)} />
            {repeatedToken && <p className='rToken'>Nome de token repetido!</p>}
          </div>
          <div className='tokenAmountdiv'>
            <p className='balanceP'>Balance</p>
            <input name="tokenAmount" type="number" value={tokenAmount} onChange={(e) => handleChange(e)} />
          </div></div>
        <div className='editButtons'>
          <button className="removeButton" onClick={(e) => handleDelete(e)}>Remove</button>
          <input type="submit" disabled={repeatedToken} value="Save" />
        </div>
      </form>
    </>
  );
}

export default EditToken;
