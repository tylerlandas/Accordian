import React from 'react';
import './accordian.css';

export default function AccessibleAccordion() {
  return (
    <React.StrictMode>
      <div>
        <div>
          <h1>
            Frequently Asked Questions
          </h1>
          
          <Instructions />
          
          // NOTE: the questions and answers should be coming from a file or database and not hardcoded.
          <ul 
            role="region"
          >
            <FAQItem
              id="faq1"
              question="What is 5G technology?"
              answer={
                <p>5G is the next generation of wireless network technology, designed to expand the scope of mobile technology beyond the capabilities of LTE. It will fuel innovation across every industry and transform every aspect of our lives. Over time, 5G technology will change the way we live, work, and play—for the better.</p>
              }
            />
            
            <FAQItem
              id="faq2"
              question="Will 4G phones work on a 5G network?"
              answer={
                <>
                  <p>You must have a 5G-capable phone to access a 5G network. Older 4G devices without 5G radios will not connect to 5G networks.</p>
                </>
              }
            />
            
            <FAQItem
              id="faq3"
              question="Will 5G work in 4G areas?"
              answer={
                <p>4G and 5G Networks have separate coverage footprints. In many places you will have both 4G and 5G coverage with a 5G device. You can check our 5G coverage map.</p>
              }
            />
          </ul>
        </div>
      </div>
    </React.StrictMode>
  );
}

function Instructions() {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-5 rounded">
      <h2 className="text-xl font-semibold mb-2 text-gray-900">
        How to Use This Accordion
      </h2>
      <ul className="list-disc ml-5 space-y-1 text-gray-700">
        <li>
          <strong>Click</strong> or <strong>tap</strong> on any question to reveal its answer
        </li>
        <li>
          <strong>Keyboard users:</strong> Press <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Tab</kbd> to navigate between questions, then <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Enter</kbd> or <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Space</kbd> to expand/collapse
        </li>
        <li>Multiple answers can be open at the same time</li>
      </ul>
    </div>
  );
}

function FAQItem({ id, question, answer }) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  const buttonId = `${id}-button`;
  const answerId = `${id}-answer`;
  
  const toggleExpanded = () => {
    setIsExpanded(prev => !prev);
  };
  
  return (
    <li className="border-b border-gray-200 last:border-b-0">
      <button
        type="button"
        id={buttonId}
        className="faq-button"
        aria-expanded={isExpanded}
        aria-controls={answerId}
        onClick={toggleExpanded}
      >
        <span>{question}</span>
      </button>
      
      <div
        id={answerId}
        className={`faq-answer ${isExpanded ? 'max-h-[1000px] py-0 px-5 pb-5' : 'max-h-0'}`}
        hidden={!isExpanded}
      >
        <div className="text-gray-600">
          {answer}
        </div>
      </div>
    </li>
  );
}
