import { POST } from "./api/server";

export default async function Home() {
  return (
      <form action={POST}>
          <div>
              <label>Title</label>
              <input name='title' type='text' />
          </div>
          <div>
              <label>Description</label>
              <textarea name='description' />
          </div>
          <button>Submit</button>
      </form>
  )
}