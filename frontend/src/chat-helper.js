export default async function chat(user_message) {
  const response = await fetch("http://0.0.0.0:80/chat/hello"); // update this to use the custom api endpoint
  const message = await response.json();
  console.log(message);
  return message;
}