// chat method is used to get a response from backend. 
// !! only one message is sent at this time. If memory is added this will have to be updated. 
export default async function chat(user_message) {
  let data = {"content":user_message};
  // call api to get response
  const response = await fetch("http://127.0.0.1:8000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
  const message = await response.text();
  console.log(message);
  return message;
}