import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import MessageList from './Messages/MessageList.jsx';
import MessageForm from './Messages/MessageForm.jsx';
import UserList from './Users/UserList.jsx';
import UserForm from './Users/UserForm.jsx';
import io from 'socket.io-client';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'disconnected', messages: [
                {
                    timeStamp: Date.now(),
                    text: "Welcome to SockChat"
                }
            ],
            users: [],
            user: ''
        }
    }

    componentWillMount() {
        this.socket = io('http://localhost:3000');
        this.socket.on('connect', this.connect.bind(this));
        this.socket.on('messageAdded', this.onMessageAdded.bind(this));
    }

    emit(eventName, payload) {
        this.socket.emit(eventName, payload);
    }

    connect() {
        this.setState({status: 'connected'});
        console.log('Connected: ' + this.socket.id);
    }

    disconnect() {
        this.setState({status: 'disconnected'});
    }

    onMessageAdded(message) {
        this.setState({messages: this.state.messages.concat(message)});
    }

    render() {
        console.log(this.state.messages);
        return (
            <div className="row">
                <div className="col-md-4">
                    <UserList {...this.state}/>
                </div>
                <div className="col-md-8">
                    <MessageList {...this.state}/>
                    <MessageForm emit={this.emit.bind(this)} {...this.state}/>
                </div>
            </div>
        )
    }
}

export default App