import Markdown from "markdown-to-jsx";
import TopNav from "./TopNav";
import './Nest.css';


export default function Nest(props) {
  const {text} = props;
  const nes = `#start typing your notes here`;
  return (
    <section className="nest-container">
      <TopNav {...props}/>
      <article>
        <Markdown>
          {text || nes}
        </Markdown>
      </article>
    </section>
  )
}
