import { Link } from "react-router-dom"

export const Feedback = () => {
  /*
  To do: 
  - Change back icon to an X
  - Add form logic
    - possibly create table in db for form data and save the feedback to the db? 
  */
  return (
    <>
      <div className="container">
        <div className="p-3 flex flex-row justify-end items-center">
          <Link to="/conversation-list">
            <button className="btn btn-active">Back</button>
          </Link>
        </div>
        <div className="flex flex-column justify-center items-center">
          <p className="text-2xl mb-4">Give us your feedback!</p>
          <form className="flex flex-column w-[70%] justify-center items-center w-[50%] border rounded p-4 shadow-sm">
            <label for="rating" className="text-lg">Rate NormChat</label>
            <div className="rating gap-1 mb-4 mt-2" id="rating">
              <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" />
              <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" />
              <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" />
              <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" />
              <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" />
            </div>
            <label for="text-response" className="text-lg">Tell us what you think</label>
            <textarea className="textarea textarea-bordered p-1.5 h-40 w-[100%] mt-2 shadow-inner" id="text-response" placeholder="What do you think?"></textarea>
            <button className="btn btn-success mt-4" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}