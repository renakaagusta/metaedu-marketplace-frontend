import TextArea, { TextAreaProps, TextAreaRef } from "antd/lib/input/TextArea";

export default function ATextArea(props: TextAreaProps & React.RefAttributes<TextAreaRef>) {
  return <TextArea {...props} />;
}