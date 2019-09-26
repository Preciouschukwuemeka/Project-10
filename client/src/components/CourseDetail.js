import React, {Component} from 'react';
import { Link } from 'react-router-dom';
const ReactMarkdown = require('react-markdown')


class CourseDetail extends Component {

  state = {
    courseData: [],
    userData: []
  }

  //mounting the courses data
  componentDidMount() { 
    this.props.context.data.getCourse(this.props.match.params.id)
      .then(data => {
        //if there is data, set it's state to data and the user data
        if (data) {
          document.title = "Course Details";
          this.setState({
            courseData: data,
            userData: data.User
          })
        } else {
          //if not, show the not found page.
          this.props.history.push('/notfound');
        }
      })
      //if get course fails, show error.
      .catch(err => {
        console.log(err);
        this.props.history.push('/error');
      });
    }

  //render this when you delete a course.
  handleDelete = async (e) => {
    e.preventDefault();
    const { context } = this.props;
    const { courseData } = this.state;
    const { emailAddress } = context.authenticatedUser;
    const password = prompt('Please confirm password.');

    context.data.deleteCourse(courseData.id, emailAddress, password)
      .then(() => {
        this.props.history.push('/')
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/error');
      });
  }


  render() {

    const {
      courseData,
      userData
    } = this.state;

    const authUser = this.props.context.authenticatedUser;

    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              {authUser && authUser.userId === userData.id ?
                <React.Fragment>
                  <span>
                    <Link className="button" to={`/courses/${courseData.id}/update`}>Update Course</Link>
                    <Link className="button" onClick={this.handleDelete} to='/'>Delete Course</Link>
                  </span>
                  <Link className="button button-secondary" to="/">Return to List</Link>
                </React.Fragment>
              :
                <React.Fragment>
                  <Link className="button button-secondary" to="/">Return to List</Link>
                </React.Fragment>
              }
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{courseData.title}</h3>
              <p>By {`${userData.firstName} ${userData.lastName}`}</p>
            </div>
            <div className="course--description">
              <ReactMarkdown source={courseData.description} />
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{courseData.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                    <ReactMarkdown source={courseData.materialsNeeded} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CourseDetail;

