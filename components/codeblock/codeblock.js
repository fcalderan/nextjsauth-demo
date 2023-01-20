import SyntaxHighlighter from "react-syntax-highlighter";

const CodeBlock = ({ code, language }) => {
  return <SyntaxHighlighter language={language}>{code}</SyntaxHighlighter>;
};

export default CodeBlock;
