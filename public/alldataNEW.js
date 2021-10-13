function AllData(){
    const [data, setData] = React.useState('');

    React.useEffect(() => {
        
        // fetch all accounts from API
        fetch('/account/all')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(JSON.stringify(data));                
            });

    }, []);

    const dataMap = data.map((user, i) => {
      return (
        <div className="row" key={i} style={{borderTop: "1px solid black"}}>
          <div className="col">
            {user._id}
          </div>
          <div className="col" style={{borderLeft: "1px solid black"}}>
            {user.name}
          </div>
            <div className="col" style={{borderLeft: "1px solid black"}}>
            {user.email}
          </div>
          <div className="col" style={{borderLeft: "1px solid black"}}>
            {user.password}
          </div>
          <div className="col" style={{borderLeft: "1px solid black"}}>
            {user.balance}
          </div>
        </div>
      );
    })

    return (
      <div className="card" style={{width: "80%"}}>
        <div className="card-header" style={{backgroundColor: "MediumPurple", color: "White"}}>All Data</div>
          <h3 className="card-title text-center display-6" style={{marginTop: "20px"}}>User Data</h3>
            <div className="card-body"> 
              <p className="card-text">Banking Accounts:</p>
                  <div className="container" style={{border: "2px solid black"}}>
                    <div className="row">
                        <div className="col" style={{border: "1px solid black"}}>
                        index
                      </div>
                      <div className="col" style={{border: "1px solid black"}}>
                        Name
                      </div>
                      <div className="col" style={{border: "1px solid black"}}>
                        Email
                      </div>
                      <div className="col" style={{border: "1px solid black"}}>
                        Password
                      </div>
                      <div className="col" style={{border: "1px solid black"}}>
                        Balance
                      </div>
                    </div>
                    <div>
                      {dataMap}
                    </div>
                  </div>
              </div>
      </div>
    );
  }