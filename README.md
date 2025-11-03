# Accoredian Control and App
This React app contains an accessible Accordian Control and is based on recommendations from
https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-faq/. 

Key Decisions:
1. I put it inside of it's own simple application for easier UI testing and should be broken out into its own project for reuse in multiple teams.
2. The CSS should also be broken up into variables so things like the font-color, size, borders, etc. can be customized to match whatever project it is going into. There should be "Default" values defined that can be easily modified.
3. In the interest of time, the questions\answers are hardcoded. Obviously they should come from a file or database.

Installation instructions for your project
  npm install

How to run the app
  npm start

How to run tests
  npm test

IMPORTANT: Tests do NOT run or compile at the moment and need to be improved upon. It has been too long since I used JEST to write tests and I ran out of time.
