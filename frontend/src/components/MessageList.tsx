interface Props {
  items: {
    from: string;
    text: string;
    at: number;
  }[];
}

export const MessageList = ({ items }: Props) => {
  return (
    <ul>
      {items.map((item, key) => (
        <li key={key}>
          {item.from}: {item.text}
        </li>
      ))}
    </ul>
  );
};
