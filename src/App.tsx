import {useEffect, useRef, useState, type FormEvent} from 'react';
import {useReducedMotion} from './hooks/useReducedMotion';
import {onFrame, startScroll} from './lib/scroll';

const steps = [
  ['01', 'Pick a time.', 'Choose a pickup window that fits between classes. Your dorm is the starting line.'],
  ['02', 'Leave the load to us.', 'We pick up your bag and take care of the washing, drying, and folding.'],
  ['03', 'Get your time back.', 'Clean, neatly folded clothes come back to your dorm. One less thing on your list.'],
];
export default function App() {
  const reduced = useReducedMotion();
  const picture = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [windowChoice, setWindowChoice] = useState('After class · 4–6 pm');
  useEffect(() => startScroll(reduced), [reduced]);
  useEffect(() => onFrame(() => {
    if (picture.current) picture.current.style.transform = reduced ? 'none' : `translateY(${Math.min(window.scrollY * .09, 65)}px) rotate(${Math.min(window.scrollY * .004, 2)}deg)`;
  }), [reduced]);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSubmitted(true); }
  return <>
    <div className="announcement">A fresh idea for Fairfield University <span>•</span> Student venture concept</div>
    <header><a className="brand" href="#top" aria-label="Fresh Fold home"><span className="brand-icon">≋</span> fresh fold</a>
      <button className="menu-toggle" aria-expanded={menu} aria-controls="nav" onClick={() => setMenu(!menu)}>{menu ? 'Close' : 'Menu'}</button>
      <nav id="nav" className={menu ? 'open' : ''} aria-label="Main navigation" onClick={() => setMenu(false)}><a href="#how">How it works</a><a href="#why">Why Fresh Fold</a><a href="#questions">FAQs</a><a className="button small" href="#pickup">Try a pickup <span>↗</span></a></nav>
    </header>
    <main id="top">
      <section className="hero">
        <div className="hero-copy"><p className="eyebrow"><span className="status-dot"/> YOUR CAMPUS. YOUR TIME.</p><h1>Less laundry.<br/>More <em>life.</em></h1><p className="intro">Your laundry, picked up, washed, folded, and brought back to your dorm. Made for college life. Starting with Fairfield.</p><a className="button" href="#pickup">Find your fresh start <span>↗</span></a><p className="micro">Dorm pickup. Fresh folds. A lighter to-do list.</p></div>
        <div className="hero-visual" ref={picture}><img src={`${import.meta.env.BASE_URL}fresh-fold.png`} alt="Freshly folded blue and white laundry on a blue laundry tote" width="1536" height="1024"/><div className="sticker">Laundry day,<br/><strong>handled.</strong><span>✳</span></div><div className="image-caption"><span>THE FRESH FOLD FEELING</span><span>01 — LESS ON YOUR PLATE</span></div></div>
      </section>
      <div className="ticker" aria-label="Pickup, wash, fold, deliver"><span>PICK UP</span><i>✳</i><span>WASH</span><i>✳</i><span>FOLD</span><i>✳</i><span>DELIVER</span><i>✳</i><span>REPEAT</span></div>
      <section id="how" className="section"><div className="section-top"><p className="eyebrow">01 / HOW IT WORKS</p><h2>From hamper<br/>to <em>happy.</em></h2><p>Three simple steps.<br/>A whole lot less laundry.</p></div><div className="steps">{steps.map(([num,title,text])=><article key={num}><span className="step-number">{num}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      <section id="why" className="why section"><div><p className="eyebrow">02 / MADE FOR YOUR REAL LIFE</p><h2>Your time belongs<br/>to <em>you.</em></h2><p className="intro">The library session. The club meeting. The plans you actually want to keep. Laundry shouldn’t get in the way.</p><p>Our mission is to make laundry convenient and affordable for college students—so there’s more room for school and campus life.</p></div><div className="benefits"><article><span>↗</span><div><h3>Dorm to door</h3><p>Pickup and return designed around campus and nearby student housing.</p></div></article><article><span>≋</span><div><h3>Fresh. Clean. Folded.</h3><p>Washing, drying, and folding, all taken off your list.</p></div></article><article><span>✳</span><div><h3>For the busy weeks</h3><p>Make it a routine, or get a little help when midterms and finals take over.</p></div></article></div></section>
      <section id="pickup" className="section booking"><div><p className="eyebrow">03 / GIVE IT A SPIN</p><h2>A lighter load<br/>starts <em>here.</em></h2><p>Explore what scheduling a Fresh Fold pickup could feel like.</p><div className="demo-note"><strong>This is a demo.</strong><p>Fresh Fold is a student venture concept, not an operating laundry service yet. No pickup is booked, no payment is collected, and your entries aren’t sent or saved. Prices and service times are still being developed.</p></div></div><div className="booking-card">{submitted ? <div className="success" role="status"><span>✓</span><p className="eyebrow">DEMO COMPLETE</p><h3>That’s a fresh start.</h3><p>You selected <strong>{windowChoice.toLowerCase()}</strong>. In a live service, you’d receive pickup instructions next.</p><p>No real pickup has been scheduled.</p><button className="button" onClick={()=>setSubmitted(false)}>Try another pickup ↗</button></div> : <form onSubmit={submit}><h3>Build your demo pickup</h3><label>Campus<select required><option>Fairfield University</option></select></label><label>Dorm or nearby housing<input required maxLength={80} placeholder="e.g. Your residence hall" autoComplete="off"/></label><label>Preferred pickup window<select value={windowChoice} onChange={e=>setWindowChoice(e.target.value)}><option>After class · 4–6 pm</option><option>Evening · 6–8 pm</option><option>Weekend · 10 am–12 pm</option></select></label><label>Your laundry load<select><option>One bag</option><option>Two bags</option><option>Three bags</option></select></label><button className="button" type="submit">Preview my pickup <span>↗</span></button><p className="micro">Illustrative options only. No real reservation.</p></form>}</div></section>
      <section id="questions" className="section faq"><div><p className="eyebrow">04 / THE SMALL PRINT, SIMPLIFIED</p><h2>Good <em>questions.</em></h2></div><div>{[['Is Fresh Fold available now?','Not yet. This website introduces a Marketing Venture startup concept, initially focused on Fairfield University. The pickup form is an interactive demonstration.'],['How much will it cost?','Pricing is still being developed. The goal is a convenient, affordable service for students, with clear prices before any real booking.'],['When would my laundry come back?','Pickup windows and turnaround times will be confirmed before launch. The times in the demo are illustrative, not a service promise.'],['Who is it for?','Students living in dorms and nearby housing who want fewer trips to shared laundry facilities—whether every week or just during a busy stretch.']].map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>
    </main><footer><a className="brand" href="#top">≋ fresh fold</a><p>A lighter load. A fuller college life.</p><span>Fairfield, CT · Student venture concept</span><a href="#top">Back to top ↑</a></footer>
  </>;
}
