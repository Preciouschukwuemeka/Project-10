import React,{Component} from './node_modules/react';

class CreateCourse extends Component {

    state = {
        messages: null
    }

    createCourse(e){
        this.setState({messages:null});
        e.preventDefault();
        const data = JSON.stringify({
            title: e.target[0].value,
            description: e.target[1].value, 
            estimatedTime: e.target[2].value,
            materialsNeeded: e.target[3].value
        });
        fetch('http://localhost:5000/api/courses', {
            method: "POST",
            body: data,
            headers: this.props.user.headers
            }
        )
            .then(res => {
                if(res.status !== 201){
                    res.json()
                        .then(res =>{
                            let messages = res.message.split(","); //split the errors
                            messages = messages.map(message => message.split(":")); //split titles from errors
                            messages = messages.map(message => message.pop()); //take only the error
                            this.setState({messages});
                        });
                }else{
                    //redirect
                    this.props.history.push('/');
                }
            });
    }

    printErrors(){
        if(this.state.messages !== null){
            const messages = this.state.messages.map((message, i) => <li key={i}>{message}</li>)
            return(
                <div>
                    <h2 className="validation--errors--label">Validation errors</h2>
                    <div className="validation-errors">
                        <ul>
                            {messages}
                        </ul>
                    </div>
                </div>
            );
        }
    }

    render(){
        return(
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                    {this.printErrors()}
                    <form onSubmit={(e) => this.createCourse(e)}>
                        <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                                defaultValue="" /></div>
                            <p>By {this.props.user.firstName} {this.props.user.lastName}</p>
                        </div>
                        <div className="course--description">
                            <div><textarea id="description" name="description" className="" placeholder="Course description..."></textarea></div>
                        </div>
                        </div>
                        <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                            <li className="course--stats--list--item">
                                <h4>Estimated Time</h4>
                                <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                                    placeholder="Hours" defaultValue="" /></div>
                            </li>
                            <li className="course--stats--list--item">
                                <h4>Materials Needed</h4>
                                <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..."></textarea></div>
                            </li>
                            </ul>
                        </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">Create Course</button>
                            <button className="button button-secondary" onClick={(e)=> {e.preventDefault();this.props.history.push('/');}}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateCourse;