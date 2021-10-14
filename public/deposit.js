function Deposit(){
  const { state, dispatch } = React.useContext(UserContext);
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [balance, setBalance] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [email, setEmail]   = React.useState("");
  //const [isLogin, setIsLogin] = React.useState(false);
  const isLogin = state.isLogin;

  React.useEffect(() => {
    if(isLogin) {
      setEmail(state.email);
    } 
  })

  function handleDeposit() { 
    fetch(`/account/update/${email}/${amount}`)
      .then(response => response.text())
      .then(text => {
          try {
              const data = JSON.parse(text);
              setStatus(JSON.stringify(data.value));
              setSuccess('Success!')
              console.log('JSON:', data);
              setBalance(data.$inc);
              const userDeposit = {
                email: email,
                amount: amount,
                balance: balance
              };
              dispatch( { type: "UPDATE_BALANCE", payload: { userDeposit }});
          } catch(err) {
              setStatus('Deposit failed')
              console.log('err:', text);
          }
    });
    setShow(true);
  }   
  
  return (
    <Card
      bgcolor="primary"
      header="Deposit"
      status={status}
      body={show ? ( 
        <>
        <h5>Current Balance: {balance}</h5><br />
        Amount<br/>
        <input type="input" className="form-control" id="amount" placeholder="Enter amount" value={amount} onChange={e => setAmount(e.currentTarget.value)} /><br/>
        <button type="submit" className="btn btn-light" disabled={!amount} onClick={handleDeposit}>Deposit</button>
        </>
      ):(
        <>
        <h5>{success}</h5>
        </>
      )}
      useraccount={state.email}
    />
  )
}