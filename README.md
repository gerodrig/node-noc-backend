# NOC Project

The goal is to create a number of tasks using clean arquitecture with Typescript

## dev
1. Clone file env.template and rename it to .env
2. Configure environment variables
 
```dotnetcli
PORT=3000
MAILER_EMAIL= 
MAILER_SECRET_KEY=
PROD=false
```

3. If node modules are not installed run command ```npm run istall``
4. Run database with command 
``` 
    docker-compose up -d
```
1. To start the application run the command ```npm run dev```