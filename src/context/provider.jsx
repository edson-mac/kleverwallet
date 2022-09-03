import React, { useState } from "react";

export const mainContext = React.createContext({});

export const WalletProvider = (props) => {

  const initialTokens = [
    { tokenName: 'KLV',
      tokenAmount: 10250.50,
    },
    { tokenName: 'DVK',
      tokenAmount: 50250.71,
    },
    { tokenName: 'KFI',
      tokenAmount: 10,
    }
  ];

  const [tokenList, setTokenList] = useState(initialTokens);
  const [editableToken, setEditableToken] = useState('');

  return (
    <mainContext.Provider value={
      {
        tokenList, setTokenList, editableToken, setEditableToken
      }}>
      {props.children}
    </mainContext.Provider>
  );
};

export const useProvider = () => React.useContext(mainContext);