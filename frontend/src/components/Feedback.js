import { useState } from "react";
import { addDoc, serverTimestamp, collection } from 'firebase/firestore'; 
import { db, auth } from "../firebase-config";
import { Link } from "react-router-dom";

export const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState(""); //state to store user's feedback text

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (feedbackText.trim() === "") {
      //adding validation for empty feedback
      alert("Please provide your feedback.");
      return;
    }

    try {
      //adding user's feedback to the "feedback" collection in Firestore DB
      await addDoc(collection(db, "feedback"), {
        text: feedbackText,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName
      });

      //clear the feedback text after submission
      setFeedbackText("");

      //provides feedback to the user --optional u can remove 
      alert("Thank you for your feedback!");
    } catch (error) {
      console.error('Error submitting feedback:', error);
      //handle error if submission fails --debugging 
      alert("An error occurred. Please try again later.");
    }
  };

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
          <form onSubmit={handleSubmit} className="flex flex-column w-[70%] justify-center items-center w-[50%] border rounded p-4 shadow-sm">
          <label for="rating" className="text-lg">Rate NormChat</label>
            <div className="rating gap-1 mb-4 mt-2" id="rating">
              <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" />
              <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" />
              <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" />
              <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" />
              <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" />
            </div>

            <label htmlFor="text-response" className="text-lg">Tell us what you think</label>
            <textarea 
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="textarea textarea-bordered p-1.5 h-40 w-[100%] mt-2 shadow-inner" 
              id="text-response" 
              placeholder="What do you think?"
            ></textarea>
            <button className="btn btn-success mt-4" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
