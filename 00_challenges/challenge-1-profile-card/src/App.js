import "./styles.css";

function Avatar() {
  return (
    <img
      className="avatar"
      src="https://miro.medium.com/v2/resize:fit:3840/1*0ubYRV_WNR9iYrzUAVINHw.jpeg"
      alt="dpul"
    />
  );
}

function Intro() {
  return (
    <div>
      <h1>Suteerth Subramaniam</h1>
      <p>
        Hi, I'm Suteerth. A flutter app developer and a full stack developer in
        the making!
      </p>
    </div>
  );
}

function SkillList() {
  return (
    <div className="skill-list">
      <Skill skillName="Flutter" emoji="💪" color="cyan" text="black" />
      <Skill skillName="ReactJS" emoji="👶" color="blue" text="white" />
      <Skill skillName="NodeJS" emoji="👶" color="green" text="white" />
      <Skill skillName="Firebase" emoji="👦" color="yellow" text="black" />
    </div>
  );
}

function Skill(props) {
  return (
    <div
      className="skill"
      style={{ backgroundColor: props.color, color: props.text }}
    >
      <span>{props.skillName}</span>
      <span>{props.emoji}</span>
    </div>
  );
}

export default function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        {}
        <SkillList />
      </div>
    </div>
  );
}
