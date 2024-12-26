import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";

interface FormData {
  name: string;
  image_url: string;
  likes: number;
  dislikes: number;
}

interface Error {
  name?: string;
  image_url?: string;
}

type Props = {
  formId: string;
  gameForm: FormData;
  forNewGame?: boolean;
};

const Form = ({ formId, gameForm, forNewGame = true }: Props) => {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: gameForm.name,
    image_url: gameForm.image_url,
    likes: gameForm.likes,
    dislikes: gameForm.dislikes,
  });

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form: FormData) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/games/${id}`, {
        method: "PUT",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status.toString());
      }

      const { data } = await res.json();

      mutate(`/api/games/${id}`, data, false); // Update the local data without a revalidation
      router.push("/");
    } catch (error) {
      setMessage("Failed to update game");
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form: FormData) => {
    try {
      const res = await fetch("/api/games", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status.toString());
      }

      router.push("/");
    } catch (error) {
      setMessage("Failed to add game");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = e.target;
    const value =
      target.name === "poddy_trained"
        ? (target as HTMLInputElement).checked
        : target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  /* Makes sure game info is filled for game name, owner name, species, and image url*/
  const formValidate = () => {
    const err: Error = {};
    if (!form.name) err.name = "Name is required";
    if (!form.image_url) err.image_url = "Image URL is required";
    return err;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = formValidate();

    if (Object.keys(errs).length === 0) {
      forNewGame ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          maxLength={20}
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="image_url">Image URL</label>
        <input
          type="url"
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          required
        />

        <label htmlFor="likes">Likes</label>
        <textarea
          name="likes"
          maxLength={60}
          value={form.likes}
          onChange={handleChange}
        />

        <label htmlFor="dislikes">Dislikes</label>
        <textarea
          name="dislikes"
          maxLength={60}
          value={form.dislikes}
          onChange={handleChange}
        />

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  );
};

export default Form;
