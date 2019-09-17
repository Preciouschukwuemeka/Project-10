
import React,{Component} from './node_modules/react';

class UpdateCourse extends Component {

    state = {
        course: {
            title: null,
            description: '',
            estimatedTime: null,
            materialsNeeded: '',
            user: {
                firstName: null,
                lastName: null,
                id: null
            }
        },
        messages:null
    }
    
    handleDescChange(e){
        this.setState({
            course:{...this.state.course, description:e.target.value}
        })
    }
    
    handleMatsChange(e){
        this.setState({
            course:{...this.state.course, materialsNeeded:e.target.value}
        })
    }

    componentDidMount(){
        fetch(`http://localhost:5000/api/courses/${this.props.id}`)
            .then(res => {
                res.json()
                    .then(course =>{
                        if(res.status === 200){
                            this.setState({course});
                        }
                    })
            })
    }
    componentDidUpdate(){
        if(this.state.course.user._id !==null && this.props.user){
            if(this.state.course.user._id !== this.props.user.id){
                this.props.history.push('/forbidden');
            }
        }
    }

    updateCourse(e){
        e.preventDefault();
        this.setState({messages:null});
        const data = JSON.stringify({
            title: e.target[0].value,
            description: e.target[1].value, 
            estimatedTime: e.target[2].value,
            materialsNeeded: e.target[3].value
        });
        fetch(`http://localhost:5000/api/courses/${this.props.id}`, {
            method: "PUT",
            body: data,
            headers: this.props.user.headers
            }
        )
            .then(res => {
                if(res.status !== 204){
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
                <h1>Update Course</h1>
                <div>
                    {this.printErrors()}
                    <form onSubmit={(e) => this.updateCourse(e)}>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                                    defaultValue={this.state.course.title} /></div>
                                <p>By {this.state.course.user.firstName} {this.state.course.user.lastName}</p>
                            </div>
                            <div className="course--description">
                                <div><textarea id="description" name="description" className="" placeholder="Course description..." onChange={(e) => this.handleDescChange(e)} value={this.state.course.description}/></div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                                        placeholder="Hours" defaultValue={this.state.course.estimatedTime} /></div>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={(e) => this.handleMatsChange(e)} value={this.state.course.materialsNeeded}/></div>
                                </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">Update Course</button>
                            <button className="button button-secondary" onClick={(e) => {e.preventDefault();this.props.history.push(`/courses/${this.props.id}`);}}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default UpdateCourse;

