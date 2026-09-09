const Header = (props) => {
  //console.log("header", props.course.name)
  return <h1>{props.course.name}</h1>
}
const Content = (props) => {
  console.log(props.course.parts.length, "here2")
  for (let i = 0; i < props.course.parts.length; ++i) {
    console.log("len", i)
    return (
      <div>
        {props.course.parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </div>
    )
  }
}
const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Total = (props) => {
  console.log(props.course, "here toltaö")
  const initValue = 0
  const sumReduce = props.course.parts.reduce((accumulator, currentValue) => {
    //console.log("accu", accumulator)
    //console.log("current", currentValue)

    return accumulator + currentValue.exercises
  }, initValue)
  console.log(sumReduce, "reduce")
  return (
    <div>
      <p>number of exercises {sumReduce}</p>
    </div>
  )
}
const Course = (props) => {
  console.log(props.courses.length, props, "props first")
  for (let i = 0; i < props.courses.length; ++i) {
    console.log(props.courses[i].name, "id")
    return (
      <div>
        {props.courses.map((course) => (
          <div>
            <Header key={course.id} course={course} />
            <Content key={course.id} course={course} />
            <Total key={course.id} course={course} />
          </div>
        ))}
      </div>
    )
  }
}

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ]

  return (
    <div>
      <h1>Web curriculum</h1>
      <Course courses={courses} />
    </div>
  )
}

export default App
