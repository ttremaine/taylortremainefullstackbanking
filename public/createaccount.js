function CreateAccount(){
    const { state, dispatch } = React.useContext(UserContext);
    const [show, setShow]         = React.useState(true);
    const [status, setStatus]     = React.useState('');
    const [name, setName]         = React.useState('');
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLogin, setIsLogin]   = React.useState(false);
    
    //Authentication
    function validate(field, label) {
      if (!field) {
        setStatus('Error: ' + label);
        alert("Error: " + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      } else if (field === password && password.length < 8) {
        setStatus('Error: password must be at least 8 characters long')
        alert("Error: password must be at least 8 characters long");
        setTimeout(() => setStatus(''),3000);
        return false;
      } else
      return true;
    }
   
    function handleCreate() {
      if (!validate(name,     'name'))     return;
      if (!validate(email,    'email'))    return;
      if (!validate(password, 'password')) return;

      console.log(name,email,password);

      const url = `/account/create/${name}/${email}/${password}`;
      (async () => {
          var res  = await fetch(url);
          var data = await res.json();    
          console.log(data);        
      })();

      const newUser = { name: name, email: email, password: password, isLogin: isLogin };

      dispatch( { type: "CREATE_USER", payload: { newUser } });
        
      setShow(false);
    }    
  
    function clearForm() {
      setName('');
      setEmail('');
      setPassword('');
      setShow(true);
    }
    
    return (
      <Card
        bgcolor="primary"
        header="Create Account"
        useraccount={state.username}
        status={status}
        body={show ? (  
                <>
                Name<br/>
                <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
                Email address<br/>
                <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
                Password<br/>
                <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
                <button type="submit" className="btn btn-light" disabled={!name && !email && !password} onClick={handleCreate}>Create Account</button>
                </>
              ):(
                <>
                <h5>Success</h5>
                <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
                </>
              )}
      />
    )
  }