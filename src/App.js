import { useState } from "react";
import "./index.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  );
}

function Accordion({ data }) {
  //in order to make sure that one item can be open only at once while the others are closed
  //we move the piece of state from AccortdionItem to the Accordion as shown below
  const [curOpen, setCurOpen] = useState(null);
  //null means none of them will be open at the beginning
  //curOpen will hold num of the currently open item
  return (
    <div classname="accordion">
      {data.map((el, i) => (
        <AccordionItem
          curOpen={curOpen}
          onOpen={setCurOpen}
          title={el.title}
          //text={el.text}
          num={i}
          key={i}
        >
          {/*passing the text as children props*/}
          {el.text}
        </AccordionItem>
      ))}
      {/*example below how we can pass an other Accordion Item using children props*/}
      <AccordionItem
        curOpen={curOpen}
        onOpen={setCurOpen}
        title="Test 1"
        //text={el.text}
        num={22}
        key="test 1"
      >
        <p>Allow React developer to:</p>
        <ul>
          <li>Break Up UI into components</li>
          <li>Make Components Reusable</li>
          <li>Place State Efficiently</li>
        </ul>
      </AccordionItem>
    </div>
  );
}
//now below lets receive those props:curOpen,onOpen
function AccordionItem({
  num,
  title,
  //text,
  onClick,
  curOpen,
  onOpen,
  children,
}) {
  //const [isOpen, setIsOpen] = useState(false);
  const isOpen = num === curOpen;
  function handleToggle() {
    // setIsOpen((isOpen) => !isOpen);
    //to toggle the number, just use onOpen and pass in the number
    //but to make sure that when you click on - it closes see below,set isOpen to null,otherwise num
    onOpen(isOpen ? null : num);
  }
  return (
    <div classname={`item${isOpen ? "open" : ""}`} onClick={handleToggle}>
      <p classname="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p classname="title">{title}</p>
      <p classname="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div classname="content-box">{children}</div>}
    </div>
  );
}
