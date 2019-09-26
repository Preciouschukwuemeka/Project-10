import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Courses extends Component {
  state = {
    courseData: []
  }

  componentDidMount() {
    document.title = "Courses";

    //mount the data and set its state to data.
    this.props.context.data.getCourses()
      .then(data => {
        this.setState({
          courseData: data
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    //map over the array of courses.
    //for each course, set it's key prop and its path.
    const courses = this.state.courseData.map(course => {
      return (
        <div key={course.id} className="grid-33">
          <Link className="course--module course--link" to={`/courses/${course.id}`}>
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{course.title}</h3>
          </Link>
        </div>
      );
    });


    return (
      <div className="bounds">
        {courses}
        <div className="grid-33">
          <Link className="course--module course--add--module" to="/courses/create">
            <h3 className="course--add--title">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course
            </h3>
          </Link>
        </div>
      </div>
    );
  }
}

export default Courses;
