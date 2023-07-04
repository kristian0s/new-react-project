import { InputHTMLAttributes, useState } from "react";

type InputProps = {
  onSendMessage: (message: string) => void;
  text: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ onSendMessage }: InputProps) => {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim() !== "") {
      setText("");
      onSendMessage(text);
    }
  };

  return (
    <div className="Input">
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={text}
          type="text"
          placeholder="Enter your message and press ENTER"
          autoFocus
        />
        <button>Send</button>
      </form>
    </div>
  );
};

export default Input;
