// import Link from "next/link";
import dbConnect from "../lib/db";
import Game, { Games } from "../models/Game";
import { GetServerSideProps } from "next";

type Props = {
  games: Games[];
};

const Index = ({ games }: Props) => {
  return (
    <>
      {games.map((game) => (
        <div key="">
          <div className="card">
            <img src={game.image_url} />
            <h5 className="game-name">{game.name}</h5>
            <div className="main-content">
              <p className="game-name">{game.name}</p>


              {/* Extra Game Info: Likes and Dislikes */}
              <div className="likes info">
                <p className="label">Likes</p>
                <p className="value-number">{game.likes}</p>
              </div>
              
              <div className="dislikes info">
                <p className="label">Dislikes</p>
                <p className="value-number">{game.dislikes}</p>
              </div>

              {/* <div className="btn-container">
                <Link href={{ pathname: "/[id]/edit", query: { id: game._id } }}>
                  <button className="btn edit">Edit</button>
                </Link>
                <Link href={{ pathname: "/[id]", query: { id: game._id } }}>
                  <button className="btn view">View</button>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

/* Retrieves game(s) data from mongodb database */
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  await dbConnect();

  /* find all the data in our database */
  const result = await Game.find({});

  /* Ensures all objectIds and nested objectIds are serialized as JSON data */
  const games = result.map((doc) => {
    const game = JSON.parse(JSON.stringify(doc));
    return game;
  });

  return { props: { games: games } };
};

export default Index;
