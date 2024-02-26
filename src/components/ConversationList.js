export function ConversationList() {
  return (
    <div className="header-section">
      <div className="top-section">
        <h1>Conversations</h1>
      </div>
      <div className="bottom-section">
        <form>
          <input type="text" placeholder="Search"></input>
        </form>
        <button>
          New Chat
        </button>
      </div>

    </div>
  );
}