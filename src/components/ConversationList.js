export function ConversationList() {
  return (
    <>
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
      <div className="conversation-list">
        <ul>
          <li>Where is the college of computing and informatics</li>
          <li>IDK something else</li>
        </ul>
      </div>
    </>
  );
}