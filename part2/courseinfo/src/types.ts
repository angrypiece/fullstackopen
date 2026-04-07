export type CourseType = {
  name: string;
  id: number;
  parts: Part[];
};

export type Part = {
  name: string;
  exercises: number;
  id: number;
};
