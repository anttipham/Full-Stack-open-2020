import React from 'react'

const Header = ({name}) => (
    <h2>{name}</h2>
)

const Part = ({part}) => (
    <p>{part.name} {part.exercises}</p>
)

const Content = ({parts}) => (
    <div>
        {parts.map((part) => <Part part={part} key={part.id} />)}
    </div>
)

const Total = ({parts}) => (
    <b>
        Total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
    </b>
)

const Course = ({courses}) => (
    courses.map((course) => (
        <div key={course.id}>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    ))
)

export default Course
