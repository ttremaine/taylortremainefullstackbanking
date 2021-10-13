function Deposit(){
  const { state, dispatch } = React.useContext(UserContext);
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [balance, setBalance] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [email, setEmail]   = React.useState("");

  function handleDeposit() { 


    fetch(`/account/update/${email}/${amount}`)
      .then(response => response.text())
      .then(text => {
          try {
              const data = JSON.parse(text);
              setStatus(JSON.stringify(data.value));
              setShow(false);
              console.log('JSON:', data);
              setBalance(JSON.stringify(data.balance))
          } catch(err) {
              setStatus('Deposit failed')
              console.log('err:', text);
          }
    });

    const userDeposit = {
      email: email,
      amount: amount,
      balance: balance
    };
    dispatch( { type: "UPDATE_BALANCE", payload: { userDeposit }});
    
    setShow(true);
  }   
  
  return (
    <Card
      bgcolor="primary"
      header="Deposit"
      useraccount={email}
      status={status}
      body={show ? ( 
        <>
        <h5>Current Balance: {balance}</h5><br />
        Email address<br/>
        <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
        Amount<br/>
        <input type="input" className="form-control" id="amount" placeholder="Enter amount" value={amount} onChange={e => setAmount(e.currentTarget.value)} />
        <button type="submit" className="btn btn-light" disabled={!amount} onClick={handleDeposit}>Deposit</button>
        </>
      ):(
        <>
        <h5>Success!</h5>
        </>
      )}
    />
  )
}