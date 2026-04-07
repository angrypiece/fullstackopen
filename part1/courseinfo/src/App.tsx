interface ExercisesProps {
  exercises1: number;
  exercises2: number;
  exercises3: number;
}

interface Part {
  name: string;
  exercises: number;
}

interface ContentProps {
  part1: Part;
  part2: Part;
  part3: Part;
}

interface PartProps {
  part: Part;
}

const Header = ({ course }: { course: string }) => {
  return <h1>{course}</h1>;
};

const Part = ({ part }: PartProps) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ part1, part2, part3 }: ContentProps) => {
  return (
    <>
      <Part part={part1} />
      <Part part={part2} />
      <Part part={part3} />
    </>
  );
};

const Total = ({ exercises1, exercises2, exercises3 }: ExercisesProps) => {
  return <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total
        exercises1={part1.exercises}
        exercises2={part2.exercises}
        exercises3={part3.exercises}
      />
    </div>
  );
};

export default App;
