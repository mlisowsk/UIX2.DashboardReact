# UIX2.DashboardReact

Sample UIX v2 ShellFrame and Dashboard add-on for M-Files using React v18.

* Uses webpack 5 for transpiling JSX to JS and bundling.
* Build process in MSBuild (*.csproj file).

## First-time Setup

After cloning this repo, open a command line, change to the project subdirectory `UIX2.DashboardReact` and run `npm install`. This will download and install all dependencies to the `node_modules` subdirectory - wait for it to complete.

## Building

To build the app use the `Build` command in Visual Studio.
The finished `mfappx` file can be found in the directory `UIX2.DashboardReact\out\Debug` or `UIX2.DashboardReact\out\Release` depending on your choice of target.
Deploy the mfappx file to the M-Files vault using M-Files Admin.

Source: https://developer.m-files.com/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/Samples/ShellFrameAndDashboard/