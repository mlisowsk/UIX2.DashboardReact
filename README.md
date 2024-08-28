# UIX2.DashboardReact

Sample UIX v2 ShellFrame and Dashboard add-on for M-Files using React v18.

* Uses webpack 5 for transpiling JSX to JS and bundling.
* Build process in MSBuild (*.csproj file).

## First-time Setup

After cloning this repo, open a command line, change to the project subdirectory `UIX2.DashboardReact` and run `npm install`. This will download and install all dependencies to the `node_modules` subdirectory - wait for it to complete.

## Building

1. To build the app use the `Build` command in Visual Studio.
2. The finished `mfappx` file can be found in the directory `UIX2.DashboardReact\out\Debug` or `UIX2.DashboardReact\out\Release` depending on your choice of target.
3. Deploy the mfappx file to the M-Files vault using M-Files Admin.

### Automated Depolyment
You can automate deployment with the PowerShell script `install-application.ps1`.
To use it, edit the script to include vault name and M-Files administrator's credentials in the section "Connection details" near the top of the file.
It will be automatically called after each build.

Source: https://developer.m-files.com/Frameworks/User-Interface-Extensibility-Framework/Reference/Version2/Samples/ShellFrameAndDashboard/