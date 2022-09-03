import React, { useEffect } from 'react';
import Header from '../componenets/Header';
import { useProvider } from "../context/provider";
import editicon from '../assets/edit-icon.svg';
import { useNavigate } from "react-router";
import './Main.css';

function Main() {

  const { tokenList, setTokenList, setEditableToken } = useProvider();
  const navigate = useNavigate();

  const initialTokens = [
    {
      tokenName: 'KLV',
      tokenAmount: 10250.50,
    },
    {
      tokenName: 'DVK',
      tokenAmount: 50250.71,
    },
    {
      tokenName: 'KFI',
      tokenAmount: 10,
    }
  ];


  const checkLocalStorage = () => {
    const klevertokens = JSON.parse(localStorage.getItem("kleverTokens"));
    if (!klevertokens) {
      return localStorage.setItem("kleverTokens", JSON.stringify(initialTokens));
    }
    return setTokenList(klevertokens);
  }

  const handleEdit = (e) => {
    setEditableToken({ ...tokenList[e.target.accessKey], tokenIndex: e.target.accessKey, })
    const newList = [...tokenList].splice(e.target.accessKey, 1)
    const newList2 = tokenList.filter(element => element.tokenName !== newList[0].tokenName)
    setTokenList(newList2)
    navigate('/edittoken');
  }

  useEffect(() => {
    checkLocalStorage()
  }, []);



  return (
    <>
      <Header />
      <div className='mainBox'>
        <div className='tableHead'>
          <p>Tokens</p>
          <p>Balance</p>
        </div>
        <div className='tokenList'>
          {tokenList && tokenList.map((e, index) =>
            <div className="tokenBox" key={index}>
              <div className='tokenName'><img accessKey={index} onClick={(e) => handleEdit(e)} className="editLogo" src={editicon} alt="EditLogo" />
                <p>{e.tokenName}</p></div>
              <div className='tokenAmount'><p>{e.tokenAmount}</p></div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Main;
