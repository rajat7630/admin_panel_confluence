import React, {Component} from 'react';
import './formstyle.css';
import axios from 'axios';
class Update_event extends Component{

    constructor(props)
    {
        super(props);
        this.state={
            total:[],
            category:"",
            name:"",
            rules:[],
            coordinators:[],
            description:"",
            venue:"",
            prize:""
        }
        this.addrule=this.addrule.bind(this);
        this.removerule=this.removerule.bind(this);
        this.rulechange=this.rulechange.bind(this);
        this.addcoordinator=this.addcoordinator.bind(this);
        this.removecoordinator=this.removecoordinator.bind(this);
        this.coordinatorchange=this.coordinatorchange.bind(this);
        this.submithandler=this.submithandler.bind(this);
        this.handlechange=this.handlechange.bind(this);
        this.handlechangeofdata=this.handlechangeofdata.bind(this);
        this.handlechangeofevents=this.handlechangeofevents.bind(this);
    }

    handlechange = (e => {
        this.setState({
            category:e.target.value
        })
        axios.get('https://us-central1-confluence19.cloudfunctions.net/api/events?category='+e.target.value)
            .then(res=>{
                    this.setState({
                        total:res.data.data.events  
                    });
                    console.log(res.data.data.events);
            });
        
    })

    submithandler = (e => {
        e.preventDefault();
        let res = this.state;
        axios.post("https://confluence-backend.appspot.com/api/events/desc/",res)
        .then(response => {
            if(response.data.success)
            {
                this.props.history.push("/");
            }
            console.log("post success", response);
        }).catch(err => {
            console.log(err);
            return err;
        });
        
    })

    handlechangeofevents=(e=>{
        let id=e.target.value;
        let eve=this.state.total[id];
        this.setState({
            name:eve.eventName,
            rules:[...eve.rules],
            description:eve.description,
            starttime:eve.starttime,
            venue:eve.venue,
            prize:eve.prize,
            coordinators:[... eve.coordinators ]

        });
    })

    handlechangeofdata=(e=>{
        let nam=e.target.name;
        let val=e.target.value;
        this.setState({
            [nam]:val
        });
    })


    removerule = idx => () => {
        this.setState({
          rules: this.state.rules.filter((s, sidx) => idx !== sidx)
        });
      };

    rulechange = idx => e => {
        const newrule = this.state.rules.map((rule, sidx) => {
          if (idx !== sidx) return rule;
          return  e.target.value;
        });
    
        this.setState({ rules: newrule });
      };

    addrule= () => {
        this.setState({
          rules: [...this.state.rules, ""]
        });
      };

      removecoordinator = idx => () => {
        this.setState({
          coordinators: this.state.coordinators.filter((s, sidx) => idx !== sidx)
        });
      };

    coordinatorchange = idx => e => {
        const newcoordinator = this.state.coordinators.map((rule, sidx) => {
          if (idx !== sidx) return rule;
          return  e.target.value;
        });
    
        this.setState({ coordinators: newcoordinator });
      };

    addcoordinator= () => {
        this.setState({
          coordinators: [...this.state.coordinators, ""]
        });
      };
    render()
    {

        let category=["photography", "dance", "music", "dramatics", "informals", "arts","literary","oratory", "quizzing", "hiking and trekking", "audio visual", "lifestyle"];

        let events=category.map((eve, idx)=>{
            return(
                <option key={idx} value={eve}> {eve} </option>
            );
            
        });

        let event_name=(this.state.total.length)?
                (
                    this.state.total.map((eve, index)=>{
                        return(
                            <option value={index}>{eve.eventName}</option>
                        );                             
                    })
                    
                ):(null)    

        return(
            <div>
                <form onSubmit={this.submithandler} >
                    <select onChange={this.handlechange} className="update_data"> 
                    <option  value="" disabled selected> Select Category </option>
                        {events}
                    </select>
                    <br/>
                    <select onChange={this.handlechangeofevents}>
                    <option  value="" disabled selected> Select Event Name </option>
                        {event_name}
                    </select>
                    <br/>
                    <input 
                        type="text"  
                        value={this.state.name} 
                        placeholder="Event Name"
                        name="name" 
                        onChange={this.handlechangeofdata} 
                     />
                     <br/>
                    <textarea 
                        value={this.state.description} 
                        type="text" 
                        placeholder="Description" 
                        name="description" 
                        onChange={this.handlechangeofdata} 
                    />
                    <br/>
                    <h4>Rules</h4>
                    {
                        this.state.rules.map((rule, idx) => (
                        <div className="rules">
                            <input
                                type="text"
                                placeholder="Write rule here..."
                                value={rule}
                                onChange={this.rulechange(idx)}
                            />
                            <button
                                type="button"
                                onClick={this.removerule(idx)}
                                className="del"
                            >-
                            </button>
                        </div>
                        
                     ))}
                     <button
                        type="button"
                        onClick={this.addrule}
                        className="addline"
                        >
                        Add Rules
                    </button>
                    <br/>
                    <input 
                        value={this.state.venue}
                        type="text" 
                        placeholder="Venue" 
                        name="venue" 
                        onChange={this.handlechangeofdata} 
                    />
                    <br/>
                        <input 
                        value={this.state.prize}
                        type="text" 
                        placeholder="Prizes" 
                        name="prize" 
                        onChange={this.handlechangeofdata} 
                    />
                    <br/>
                    <h4>Coordinators</h4>
                    {
                        this.state.coordinators.map((rule, idx) => (
                        <div className="rules">
                            <input
                                type="text"
                                placeholder="Name(Phone Number)"
                                value={rule}
                                onChange={this.coordinatorchange(idx)}
                            />
                            <button
                                type="button"
                                onClick={this.removecoordinator(idx)}
                                className="del"
                            >-
                            </button>
                        </div>
                        
                     ))}
                     <button
                        type="button"
                        onClick={this.addcoordinator}
                        className="addline"
                        >
                        Add Coordinator
                    </button>
                    <br/>

                    <input type="submit" className= "submit_type" value="Submit" onClick={this.submithandler}/>
                 </form>    
            </div>
        )
    }
}
export default Update_event; 