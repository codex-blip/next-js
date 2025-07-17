import TopNav from "./TopNav";

export default function Editor(props) {
  const {text , setText} = props;
  return (
    <section className="notes-container">
      <TopNav {...props}/>
      <textarea placeholder="Start typing your notes here..." value={text} onChange={setText}/>
    </section>
  )
}
