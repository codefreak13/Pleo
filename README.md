## PLEO EXPENSE TRACKER

An app that tracks the employees expenses.

## Overview

The app was built using React Native and Typescript and the data set used in the app was provided by the Pleo team but it was used directly in the app without any backend.

## Setup

### Cloning The App Repo

Open this link([Setup React Native CLI](https://reactnative.dev/docs/environment-setup)) on your computer browser tab.  
Select your operating system(OS) type as the Development OS and iOS as your target OS.  
Follow the instructions to properly setup your local machine for React Native Development.

When you have successfully completed the setup, you can proceed to clone the app.

_Before cloning the app, specify the directory/folder to clone the app to with the command line prompt_.

_For example, to clone into the Desktop folder, enter the command below into your command line_.

> `$ cd Desktop`

##

To clone the application, copy and paste any of the commands below to your machine command line, according to your git setup, then press enter

#### If your Git is setup for:

##### HTTPS

> `$ git clone https://github.com/codefreak13/Pleo.git`

##### SSH

> `$ git clone git@github.com:codefreak13/Pleo.git`

##

### Running The App

After cloning the app, open the app folder with your favourite IDE or code editor and install node modules with the command below

> `$ yarn install`

##

All is set!
You can now build the app by running the following command on your IDE terminal

> `$ yarn ios`

This command will also spin up the simulator and run the app

## Testing the App

Testing in the app was setup using Jest and Detox for end to end testing.

### e2e Test

To run the e2e test, first the build the test using

> `$ yarn e2e:ios:build`

And then, run the test

> `$ yarn e2e:ios:test`

## Summary

- I built a infinite scroll for the expenses with SectionList, Redux, Redux Toolkit and Redux thunk. The expenses were filtered according to their date of transaction. The Flatlist items navigate to the expense details page which allows the client to preview expenses, comment on them as well as upload multiple images with either camera or document upload on a carousel. The page can subsequently be shared using the ellipsis icon on the top right of the screen. I added multi language localization for English and German.
  I wrote end-to-end tests with Detox and Jest.

  The project took me about one week to complete because I was very busy with my fulltime job after having to partake in a fast-paced sprint all week.
