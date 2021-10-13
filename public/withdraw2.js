function Withdraw(){
    const { state, dispatch } = React.useContext(UserContext);
    const [withdrawNum, setWithdrawNum] = React.useState('');
    const [status, setStatus] = React.useState('');
      
    function validate(field){ 
      if (isNaN(field)) {
        setStatus('Error: Not a number');
        alert('Error: Not a number');
        setTimeout(() => setStatus(''),3000);
        return false;
      } else if (!field || field === 0) {
        setStatus('Error: No amount entered');
        alert('Error: No amount entered');
        setTimeout(() => setStatus(''),3000);
        return false; 
      } else if (field < 0) {
        setStatus('Error: Negative amount entered');
        alert('Error: Negative amount entered');
        setTimeout(() => setStatus(''),3000);
        return false;
      } else if (field > currentBalance) {
        alert('Account Overdraft Alert! You have overdrafted your account');
        return true;
      }
    return true;
  }
  
    function clearForm() {
      setWithdrawNum('');
      setStatus('Success: Your withdraw has been processed');
      setTimeout(() => setStatus(''),3000);
    }
    
    function handleWithdraw() {
      let withdrawNumFloat = parseFloat(withdrawNum);
      if (!validate(withdrawNumFloat))     return;
      fetch(`/account/update/${email}/-${amount}`)
      .then(response => response.text())
      .then(text => {
          try {
              const data = JSON.parse(text);
              setStatus(JSON.stringify(data.value));
              setShow(false);
              console.log('JSON:', data);
          } catch(err) {
              props.setStatus('Withdrawl failed')
              console.log('err:', text);
          }
      });
      clearForm();
    }
  
    return (
      <Card
        bgcolor="primary"
        header="Withdraw"
        useraccount={state.username}
        status={status}
        body={
              <div>
                <h5>Current Balance: </h5><br />
                <div className="input-group mb-3">
                  <input type="input" className="form-control" id="withdrawNum" placeholder="Enter amount" value={withdrawNum} onChange={e => setWithdrawNum(e.currentTarget.value)} />
                </div>
                <button type="submit" className="btn btn-light" disabled={!withdrawNum} onClick={handleWithdraw}>Withdraw</button>
              </div>
              }
      />
    )
  }