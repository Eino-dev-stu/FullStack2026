const Header = (props) => {
  console.log("header", props.course.name)
  return <h1>{props.course.name}</h1>
}
const Content = (props) => {
  console.log(props, "here2")
  return (
    <div>
      <Part part={props.course.parts[0]} />
      <Part part={props.course.parts[1]} />
      <Part part={props.course.parts[2]} />
    </div>
  )
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
    console.log("accu", accumulator)
    console.log("current", currentValue)

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
  //console.log(props, "props+")
  return (
    <div>
      <Header course={props.course} />
      <Content course={props.course} />
      <Total course={props.course} />
    </div>
  )
}

const App = () => {
  const course = {
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
    ],
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
