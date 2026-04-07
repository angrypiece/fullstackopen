import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);

  const [votes, setVotes] = useState<number[]>(
    new Array(anecdotes.length).fill(0),
  );

  const handleNext = () => {
    setSelected((selected + 1) % anecdotes.length);
  };

  const handleVote = (selected: number) => {
    setVotes([
      ...votes.map((vote, i) => {
        if (i === selected) {
          return (vote = vote + 1);
        }
        return vote;
      }),
    ]);
  };

  const selectedAnecdote = anecdotes[selected];
  const selectedVotes = votes[selected];
  const highestVotes = Math.max(...votes);
  const highestVotesIndex = votes.findIndex(
    (voteCount) => voteCount === highestVotes,
  );
  const mostVotedAnecdote = anecdotes[highestVotesIndex];

  return (
    <div>
      <h2>The best anecdote</h2>
      <p>{mostVotedAnecdote}</p>
      <p>has {highestVotes} votes</p>
      <hr />
      <h2>Anecdote of the day</h2>
      <p>{selectedAnecdote}</p>
      <p>
        {selectedVotes > 0
          ? `Has ${selectedVotes} votes`
          : `Doesn't have votes yet`}
        <span>
          {" ("}
          {selected + 1}/{anecdotes.length}
          {")"}
        </span>
      </p>
      <button onClick={() => handleVote(selected)}>vote</button>
      <button onClick={handleNext}>next anecdote</button>
    </div>
  );
};

export default App;
