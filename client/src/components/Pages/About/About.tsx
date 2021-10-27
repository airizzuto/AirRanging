import "./About.scss";

const About = () => {
  return (
    <div className={"container"}>
      <h1>About Air Ranging</h1>
      <div className={"text"}>
        <p>Hello, my name is Agustín and welcome to my web page!</p>
        <p>
          Used to be an airplane pilot and designer for an R&D Aerospace company.
          Always had an interest in programming and technology so it made sense to switch to a career as a full-time programmer.
          Started this project as a way to learn about Full Stack development while also combining all my previous passions into this site.
        </p>
        <p>
          Some of the languages and technologies applied to this site are:
          <ul> 
            <li>Front End: React / Typescript / Sass</li>
            <li>Back End: .NET Core / EF Core / PostgreSQL</li>
            <li>Other Tools: Docker / Git / Github</li>
            <li>Third Party APIs: Google Maps</li>
          </ul>
        </p>
        <p>
          Roadmap:
          <ul>
            <li>Airports and Points of Interest saved to users and visualized on map.</li>
            <li>Further flight planning options like multiple navigation points.</li>
            <li>Basic weather information introduced to planning calculations.</li>
            <li>NOTAMs.</li>
            <li>Mobile app.</li>
          </ul>
        </p>
      </div>
    </div>
  );
};

export default About;
