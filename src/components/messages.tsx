type Message = {
  text: string;
  member: Member;
};

type Member = {
  [x: string]: any;
  color: string;
  username: string;
  id: string;
};

type MessagesProps = {
  messages: Message[];
  currentMember: Member;
};

const Messages = ({ messages, currentMember }: MessagesProps) => {
  const renderMessage = (message: Message) => {
    const { member, text } = message;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe
      ? "Messages-message currentMember"
      : "Messages-message";

    return (
      <li className={className}>
        <span
          className="avatar"
          style={{
            backgroundColor: messageFromMe
              ? currentMember.color
              : message.member.clientData.color,
          }}
        />
        <div className="Message-content">
          <div className="username">
            {messageFromMe
              ? currentMember.username
              : message.member.clientData.username}
          </div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  };

  return <ul className="Messages-list">{messages.map(renderMessage)}</ul>;
};

export default Messages;
