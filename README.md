# FP-Pleiades

## Sites

- [public project page](https://chanwutk.github.io/pleiades/)
- [application](https://chanwutk.github.io/pleiades/app.html)

## Team members

- Chanwut Kittivorawong
- Manesh Jhawar
- Sorawee Porncharoenwase

## Installation & Building

First, make sure that you have [`yarn`](https://yarnpkg.com/en/docs/install) installed. Next, change the directory to the current directory and run `yarn`.

To build the project in the development mode, run `yarn start`. To build the project in the production mode, run `yarn build`. Use `yarn test` to run tests.

To view the project locally in the production mode, run `python3 -m http.server` in `docs` and navigate to http://0.0.0.0:8000/. Alternatively, you can view the project from the development mode or from our [public project page](https://chanwutk.github.io/pleiades/).

## Teamwork

### Chanwut Kittivorawong

- Design & Implementation:
  - Syntax tree for representing a state of working Vega-Lite view
  - Validation for operations, such as axis compatibility before layering, and datasets compatibility before facet-/repeating
  - The logic for syntax tree modification for operations
  - Inner View Navigator
- Paper:
  - Related work
  - Methods
  - Future work

### Manesh Jhawar

- Design & Implementation:
  - General Developement
- Paper: 
  - Abstract 
  - Introduction 
  - Result

### Sorawee Porncharoenwase

- Design & Implementation:
  - Project Infrastructure (React setup, Webpack setup)
  - React state management design and undo/redo system
  - Overall layout
  - Interaction design (operands and operator)
  - Sidebar for choosing specifications
  - Editor for editing specifications
- Paper:
  - Well-formedness
  - Discussion

## Project Process
1. We meet weekly to discuss our idea and progress on the application.
2. We started by designing Syntax Tree for representing composite view structure.
3. Then, we started designing overall interface and implement it with also incoperating the syntax tree implemented.
4. After that, we implement the four main composite operation (layer, concat, facet, repeat) and add validation to each operations.
5. In the end that we got a working application, we sent out a survey to peers who have experience in Vega-Lite and ask their opinion about our application.
6. We then make a poster for the demo. And from the demo, we observed how our peers use our application. And then, we made some adjustment to issues mentioned by them.
7. From both feedbacks from the survey and from the demo, we use them to analyze our result in the final paper.
