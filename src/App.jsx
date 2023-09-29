import { useState } from "react";
import "./App.css";

function App() {
  const [boards, setBoards] = useState([]);

  return (
    <>
      <header>
        <h1>cool site</h1>
      </header>
      <main>
        <section>
          <h2>section 1</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quis
            sit recusandae officia alias dolorem pariatur ipsam quam similique
            corrupti, nobis architecto odit at accusantium voluptatem quos a
            voluptas saepe?
          </p>
          <button
            onClick={() => {
              //https://kanban-backend-a6be.onrender.com
              fetch(import.meta.env.VITE_BACKEND_URL + "/boards")
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                  setBoards(data);
                })
                .catch((e) => console.error(e));
            }}>
            extra content
          </button>
          {boards.map((board) => (
            <p key={board.id}>{board.name}</p>
          ))}
        </section>
        <section className="section-two">
          <h2>section 2</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
            laboriosam doloremque corporis, nesciunt possimus unde recusandae
            eius quo enim perspiciatis, dolores quia nam eum amet nisi! Cumque
            cupiditate velit perspiciatis.
          </p>
          <button className="button-two">button two</button>
        </section>
        <section>
          <h2>section 3</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto
            reiciendis doloribus soluta exercitationem doloremque, fugit
            blanditiis unde earum voluptatem dolores ex assumenda tempore
            debitis, pariatur rerum eum officiis, delectus sequi!
          </p>
        </section>
      </main>
    </>
  );
}

export default App;
