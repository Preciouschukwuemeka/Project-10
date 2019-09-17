import React,{Component} from './node_modules/react';
import {NavLink} from './node_modules/react-router-dom';
import ReactMarkdown from './node_modules/react-markdown';

class CourseDetail extends Component {

    state = {
        course: {
            title: null,
            description: null,
            estimatedTime: null,
            materialsNeeded: null,
            user:{
                firstName: null,
                lastName: null
            }
        }
    }

    componentDidMount(){
        fetch(`http://localhost:5000/api/courses/${this.props.id}`)
            .then(res => {
                res.json()
                    .then(course =>{
                        if(res.status === 200){
                            this.setState({course})
                        }else{
                            this.props.history.push('/notfound')
                        }
                    })
            })
    }

    populateMaterials(){
        if(this.state.course.materialsNeeded!==null && this.state.course.materialsNeeded!==undefined){
            let materials = this.state.course.materialsNeeded.split('* ');
            materials.shift();
            return(materials.map((material,key) => <li key={key}><ReactMarkdown key={key} source={material} /></li>))
        }
    }

    showAuthorButtons(){
        if (this.state.course.user!==null && this.props.user!==null){
            if(this.state.course.user._id === this.props.user.id){
                return(
                    <span>
                        <NavLink className="button" to={`/courses/${this.props.id}/update`}>Update Course</NavLink>
                        <button className="button" to="/" onClick={() => this.deleteCourse()}>Delete Course</button>
                    </span>
                );
            }
        }
    }

    deleteCourse(){
        fetch(`http://localhost:5000/api/courses/${this.props.id}`,{
            method: "DELETE",
            headers: this.props.user.headers
        }).then(res => {
            if(res.status === 204){
                this.props.history.push('/');
            }
        });
    }

    render(){
        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            {this.showAuthorButtons()}
                            <NavLink className="button button-secondary" to="/">Return to List</NavLink></div>
                    </div>
                </div>

                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{this.state.course.title}</h3>
                            <p>By {this.state.course.user.firstName} {this.state.course.user.lastName}</p>
                        </div>
                        <div className="course--description">
                            {<ReactMarkdown source={this.state.course.description}/>}
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{this.state.course.estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ul>
                                        {this.populateMaterials()}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default CourseDetail;