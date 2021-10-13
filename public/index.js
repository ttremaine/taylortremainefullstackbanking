const UserContext = React.createContext({
  name:"", 
  email:"",
  password:"",
  balance:0,
  isLogin: false,
  isAuth: false,
});

function Spa() {
  const initialContext = React.useContext(UserContext);
  const [state, dispatch] = React.useReducer(usersReducer, initialContext);

  return (
    <HashRouter>
      <div>
        <NavBar/>        
        <UserContext.Provider value={{ state, dispatch }}>
          <div className="container" style={{padding: "20px"}}>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            <Route path="/logout/" component={Logout} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            {/* <Route path="/transactions/" component={Transactions} /> */}
            <Route path="/balance/" component={Balance} />
            <Route path="/alldata/" component={AllData} />
          </div>
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);
