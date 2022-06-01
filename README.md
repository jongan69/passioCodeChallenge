# Passio React Native Code Challenge

Demo: https://expo.dev/@jongan69/passioCodeChallenge?serviceType=classic&distribution=expo-go

<p align="left">
  <img src="/assets/images/IMG_1825.PNG" width="200" title="Home Screen">
  <img src="/assets/images/IMG_1826.PNG" width="200" alt="Modal Screen">
   <img src="/assets/images/IMG_1827.PNG" width="200" alt="Settings Screen">
</p>


## TL;DR:

### An app with a form for Height and Weight that can recalculate form values on Unit change With the ability to save and pull from storage 

## Getting started:

To run the app you need react native Expo installed <br/>
`yarn add expo`

To install all dependencies <br/>
`yarn install`

Once all neccessary dependencies are installed (Expo, react-native, etc.) <br/>
`expo start` or  `yarn start`

Ejecting to react native <br/>
`expo eject`

## Project Spec

We estimate that this challenge should take 2-4 hours to complete. We expect you to review the requirements and reply in an email with clarifying questions to remove ambiguity if needed. If you feel that the challenge is going to take much longer than 2-4 hours, please let us know!

Create a React Native form screen with the following fields:

Weight (numeric keyboard input)

Height (numeric keyboard input)

Units (multi-select with options “imperial” and “metric”)

Units should default to imperial.

For imperial units, weight should be in lbs and height should be in feet and inches.

For metric units, weight should be in kilograms and height should be in meters.

Unit labels (lbs, ft, kg, m) should be rendered to the right of the corresponding input fields.

When the units selection is changed, the height and weight values should be recalculated and the unit labels should be updated.

Include a “Save” button at the bottom that stores the data as a JSON file on disk. When the app is launched, attempt to load the same JSON file and render its values in the form.

Please implement this form using React Native, TypeScript, React hooks, and a state management solution like redux or simply useReducer.

The code should be well-typed and not use any or unknown types.

Please implement unit tests to verify the form renders correctly and that changing the units properly recalculates the height and weight values.

Outside of these requirements, feel free to use whatever tools and techniques you prefer to showcase your skills and please feel free to make the form look nice with good styles.

How to deliver: Please upload your app to a new GitHub repo and share with us.

Please document everything required for us to run / test the app in the README.


## PROBLEMS:<br/>
- Decciding how to structure form
- Fixing calculation on proper state during correct render
- Implementing form validation
- Using Async Storage or Redux toolkit (same outcome different tooling)
- Need to build out jest tests for form

## LOGS:<br/>
- Was given project on 5/27/2022
- Created basic form snack: https://snack.expo.dev/@jongan69/passio-rn-code-challenge
- Created basic switch snack: https://snack.expo.dev/@jongan69/privileged-chocolate
- Created useReducer snack:  https://snack.expo.dev/@jongan69/usereducer-example
- Built this repo for project requirements
- Built project using `Expo init` and added correct screen names and function from snack demos
- Email back Dave for Feedback
