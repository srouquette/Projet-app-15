import Form from "@/app/components/Form";

const NewGame = () => {
  const gameForm = {
    name: "",
    image_url: "",
    likes: 0,
    dislikes: 0,
  };

  return <Form formId="add-game-form" gameForm={gameForm} />;
};

export default NewGame;
