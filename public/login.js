function Login(){
    const { state, dispatch }     = React.useContext(UserContext);
    const [show, setShow]         = React.useState(true);
    const [status, setStatus]     = React.useState('');
    const [success, setSuccess] = React.useState('');
    const [name, setName]         = React.useState('');
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLogin, setIsLogin]   = React.useState(false);
    
    React.useEffect(() => {
      if(isLogin) {
         setShow(false);
         setStatus(state.email + " is logged in");
      } else {
        setShow(true);
      }

    })

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
      if (!validate(email,    'email'))    return;
      if (!validate(password, 'password')) return;  
      const logoutUser = {
        name: name,
        email: email,
        password: password,
      };
      dispatch( { type: "LOGOUT_USER", payload: { logoutUser }});
      setShow(true);
    }
  
    function handleLogin() {
      if (!validate(email,    'email'))    return;
      if (!validate(password, 'password')) return;

      fetch(`/account/login/${email}/${password}`)
        .then(response => response.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
                setStatus('');
                setShow(false);
                setIsLogin(true);
                console.log('JSON:', data);
                const loginUser = { 
                  name: name,
                  email: email,
                  password: password,
                  isLogin: isLogin
                };
                dispatch( { type: "LOGIN_USER", payload: { loginUser }});
            } catch(err) {
                setStatus(text)
                setShow(true);
                setPassword('');
                console.log('err:', text);
            }
        });

      
     
      setShow(false);
    }    
    
    return (
      <Card
        bgcolor="primary"
        header="Login"
        status={status}
        body={show ? (  
                <>
                Email address<br/>
                <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
                Password<br/>
                <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
                <button type="submit" className="btn btn-light" disabled={!email && !password} onClick={handleLogin}>Login</button>
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