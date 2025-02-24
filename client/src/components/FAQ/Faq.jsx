import React, { useState } from "react";
import { Collapse } from "react-bootstrap"; // Ensure Bootstrap Collapse is correctly imported
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap styles are included
import "./Faq.css"; // Importing the external CSS file

function Faq() {
  const [open, setOpen] = useState(
    Array(10).fill(false) // Ensuring state is initialized properly
  );

  const toggleCollapse = (index) => {
    setOpen((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      console.log(newState); // Debugging
      return newState;
    });
  };

  return (
    <div className="accordion w-100" id="basicAccordion">
      <div className="card">
        <div className="card-header">
        <h2 className="text-white">FAQs - SmartBridge - One:One Mentoring</h2>
        </div>

        {/* FAQ 1 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              onClick={() => toggleCollapse(0)}
              aria-expanded={open[0]}
              aria-controls="collapseOne"
            >
              How do I book a mentoring session?
            </button>
          </h2>
          <Collapse in={open[0]}>
            <div id="collapseOne" className="accordion-body">
              <p>
                To book a mentoring session, simply sign up or log in to your
                SmartBridge account. Browse through the list of available
                mentors, choose the one that suits your needs, and schedule a
                session at your preferred time. You will receive a confirmation
                email with the details of your session.
              </p>
            </div>
          </Collapse>
        </div>

        {/* FAQ 2 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              onClick={() => toggleCollapse(1)}
              aria-expanded={open[1]}
              aria-controls="collapseTwo"
            >
              What is the process of mentoring on SmartBridge?
            </button>
          </h2>
          <Collapse in={open[1]}>
            <div id="collapseTwo" className="accordion-body">
              <p>
                SmartBridge connects you with experienced mentors who provide
                one-on-one guidance in various fields. You can choose a mentor
                based on your area of interest, schedule a session, and
                communicate directly with your mentor to receive personalized
                advice and career support.
              </p>
            </div>
          </Collapse>
        </div>

        {/* FAQ 3 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              onClick={() => toggleCollapse(2)}
              aria-expanded={open[2]}
              aria-controls="collapseThree"
            >
              How can I pay for mentoring sessions?
            </button>
          </h2>
          <Collapse in={open[2]}>
            <div id="collapseThree" className="accordion-body">
              <p>
                Payments for mentoring sessions are processed securely via
                Stripe. After selecting a mentor and booking a session, you'll
                be prompted to make a payment using your preferred payment
                method. Stripe supports a variety of options including
                credit/debit cards.
              </p>
            </div>
          </Collapse>
        </div>

        {/* FAQ 4 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              onClick={() => toggleCollapse(3)}
              aria-expanded={open[3]}
              aria-controls="collapseFour"
            >
              How do I communicate with my mentor?
            </button>
          </h2>
          <Collapse in={open[3]}>
            <div id="collapseFour" className="accordion-body">
              <p>
                Once your session is confirmed, you’ll be able to communicate
                with your mentor through our secure messaging platform or via
                video call, depending on the mentor’s preference and your
                booking details.
              </p>
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
}

export default Faq;
