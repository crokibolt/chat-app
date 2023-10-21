# Chat App

## Description
Fullstack chat app built using .NET and React. The app uses SignalR to implement real time features. Can check the deployed app [here](https://crokibolt.gitub.io/chat-app)

## How to run locally
After you clone the repository you need to set your DbConnection in the appsettings.json inside the ChatApi folder, the string should connect to a postgres database. After that execute the following commands on your terminal
```
## On the \API\ChatApi directory
dotnet run

## On the \View\chatView directory
npm install
npm run dev
```

