interface Person {
  name: string;
  age: number;
}

interface HelloProps {
  friend: Person;
}

const Hello = ({ friend }: HelloProps) => {
  console.log(friend);
  return (
    <div>
      <p>
        Hello {friend.name} {friend.age} years old
      </p>
    </div>
  );
};

const App = () => {
  const friends = [
    { name: "Jack", age: 33 },
    { name: "John", age: 22 },
  ];

  return (
    <div>
      <h1>Greetings</h1>
      <Hello friend={friends[0]} />
      <Hello friend={friends[1]} />
    </div>
  );
};
export default App;
