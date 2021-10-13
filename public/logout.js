function Logout(){
    const [show, setShow]         = React.useState(true);
    const [status, setStatus]     = React.useState('');
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');
    const [login, setLogin]       = React.useState('');
    const { state, dispatch }     = React.useContext(UserContext);  

    function validate(field, label) {
      if (!field) {
        setStatus('Error: ' + label);
        alert("Error: " + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      } else
        return true;
    }

    function handleLogout() {
        setEmail('');
        setPassword('');
        dispatch( { type: "LOGOUT_USER" });
        setShow(true);
    }
  
    function handleLogin() {
      if (!validate(email,    'email'))    return;
      if (!validate(password, 'password')) return;

      const loginUser = { username: email };
      let loginUsername = loginUser.username;
      //let loginPassword = loginUser.password;
      
      dispatch( { type: "LOGOUT_USER" });
     
      console.log(loginUsername);
      
      console.log(email,password);
      fetch(`/account/login/${email}/${password}`)
        .then(response => response.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
                setStatus('');
                setShow(false);
                console.log('JSON:', data);
            } catch(err) {
                setStatus(text)
                console.log('err:', text);
            }
        });
        
      setShow(false);
    }    
    
    return (
      <Card
        bgcolor="primary"
        header="Logout"
        useraccount={state.username}
        status={status}
        body={show ? (  
                <>
                Email address<br/>
                <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
                Password<br/>
                <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
                <button type="submit" className="btn btn-light" disabled={!email && !password} onClick={handleLogin}>Logout</button>
                </>
              ):(
                <>
                <h5>Logged Out</h5>
                </>
              )}
      />
    )
  }