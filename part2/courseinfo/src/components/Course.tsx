import type { CourseType, Part } from "../types";

interface HeaderProps {
  name: string;
}

const Header = ({ name }: HeaderProps) => {
  return <h2>{name}</h2>;
};

interface PartProps {
  part: Part;
}

const Part = ({ part }: PartProps) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

interface ContentProps {
  parts: Part[];
}

const Content = ({ parts }: ContentProps) => {
  return (
    <>
      {parts.map((part) => (
        <Part part={part} />
      ))}
    </>
  );
};

interface TotalProps {
  parts: Part[];
}

const Total = ({ parts }: TotalProps) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>
      <b>Number of exercises {total}</b>
    </p>
  );
};

interface CourseProps {
  course: CourseType;
}

const Course = ({ course }: CourseProps) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
