## ממשלת העם

ממשלת העם - בואו תבחרו את הרכב החלומות שלכם

מסמך האפיון פתוח ב-[Google Docs](https://docs.google.com/document/d/1lYLlI-vkl-UEw7gLVxJds1L4JbiwyT2v15X2V1rtfWI/edit)


### Developer Instructions
#### Server Installation

    cd server
    npm install

#### Client Installation

    cd ../client
    npm install
    bower install

And make sure you have ruby + compass installed ([instructions here](http://compass-style.org/install/)) - We'll get rid of this dependency soon.

#### Run
1. Make sure `mongod` is running
1. From the server folder, run `node app`
1. From client, run `grunt serve`