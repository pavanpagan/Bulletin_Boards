# Interface
![Screenshot from 2019-07-04 17-56-40](https://user-images.githubusercontent.com/44023507/60666654-2e87c700-9e85-11e9-83f3-bf13ef6ce632.png)

# Create Board

![Screenshot from 2019-07-04 18-02-04](https://user-images.githubusercontent.com/44023507/60666921-e026f800-9e85-11e9-8871-0d4e056fc784.png)

# Comment Page

![Screenshot from 2019-07-04 17-58-43](https://user-images.githubusercontent.com/44023507/60666796-8aeae680-9e85-11e9-8b75-7882d8d02921.png)


# Bulletin_Board_nodejs_express_postgresql_sequelize_with_reactUI

This is a react based bulletin dashboard with node js,express server and built with sequelize and used postgresql database 

# There are two projects
	
# 1) React App(boardFrontend)

# 2) Server(boardServer)


#Installation Steps

# 1) React App 
	
	$ npm install
	$ npm start
#      If you run into below specified error

	ENOSPC: System limit for number of file watchers etc......

        Excecute this command

	$ sudo sysctl fs.inotify.max_user_watches=582222 && sudo sysctl -p

# Api url i have specified you can set as env variable and use it in react app

	const API_URL = 'http://127.0.0.1:8000';
	
# inside react app in Components/Body/Details.jsx and Components/extra/TableReturn.jsx i have specified image path you need to specify your system path where server directory exists

In my case below one is the image uploading uploads directory path
 /home/vrvembassy1/work/s/pavan/Bulletin_Boards/boardServer/uploads

 const images = importAll(require.context('/home/vrvembassy1/work/s/pavan/Bulletin_Boards/boardServer/uploads', false, /\.(png|jpe?g|svg|JPG)$/));


# 2) Server (boardServer)

	Install sequelize cli globally

	$ npm install --save -g  sequelize-cli

# Check config file and modify it according to your postgresql configuration

	{
	  "development": {
	    "username": "postgres",
	    "password": "root",
	    "database": "bboard",
	    "host": "127.0.0.1",
	    "port": 5432,
	    "dialect": "postgres",
	    "operatorsAliases": "Sequelize.Op"
	  },
	  "test": {
	    "username": "postgres",
	    "password": "root",
	    "database": "bboard",
	    "host": "127.0.0.1",
	    "port": 5432,
	    "dialect": "postgres",
	    "operatorsAliases": "Sequelize.Op"
	  }
	}
# create database in postgreSQL

	$ CREATE DATABASE bboard;

# Now Run Migrations

	$ sequelize db:migrate
	
# Now in server directory install dependencies

	$ npm install

# Start server
	$ npm start

 
