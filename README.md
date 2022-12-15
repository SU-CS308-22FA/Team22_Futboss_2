# [FUTBOSS](https://web-production-16a3.up.railway.app/)
 
 Go to website: (https://web-production-16a3.up.railway.app/)
 
# Table of contents
- [General info](#general-information)
  * [Description](#description)
  * [Contributors](#contributors)
- [User Documentation](#user-documentation)
  * [Installation](#how-to-install-and-run-the-software)
  * [Report Bug](#how-to-report-a-bug)
  * [Known Bugs](#known-bugs)
- [Developer Documentation](#developer-documentation)
  * [Obtaining the Source Code](#obtaining-the-source-code)
  * [Layout of the Directory](#layout-of-the-directory)
  * [Build and Deploy ](#build-and-deploy)
    
 
# GENERAL INFORMATION
## DESCRIPTION
Futboss is a web aplication where player ranked and categorized based on their statistics in the games they play. This catogarization confirm any player’s game style and rank them on their performance. Moreover, current match results and statistics can be followed from Futboss.  
## CONTRIBUTORS
- Cemal Turgut 26842
- Osman Emre Bilen 26469
- Irmak Özügüzel 28258
- Yavuz Berkay Altınok 28301

# USER DOCUMENTATION
### How to install and run the software
No need to install or run anything to access Futboss, website can be accessed [HERE](https://web-production-16a3.up.railway.app/)
### How to report a bug
If you found a bug and want to report it, you can use github issues page by creating a new issue and linking this project.
Also, there is a "Report Bug" section in the application. Users can report any bug from application interface.
### Known bugs
- There is a bug while updating profile picture. The picture whic is uploaded can not be stored in database.
- Some pages backward path are not working properly.

# DEVELOPER DOCUMENTATION
### Obtaining the Source Code 
We use the same document for the web app's frontend and backend, and you can find this code on our GitHub repository.
There are two ways to obtain the code:

1- Using the URL shown in the GitHub green "Code" button, clone the repository. Take the GitHub repository's HTTPS link, and then select the directory where you wish to read the source code. You then clone the repository to your local device within the desired directory using git clone and the https that was acquired.

2- Getting the source code from GitHub as a zip file. The green "Code" button is clicked, and a download ZIP is opened to obtain the code. It is then necessary to unzip the file. You then open the unzipped code file to view the source code in your preferred Integrated Development Environment.
### Layout of the Directory
- server
    - controllers
      - relationships.js → db relationships
    - package.json → Dependencies of the application 
    - index.js → all db funtions, classes and db connection
    - db.js → The database connection file

- client
    - public → Public files like the application icon
    - src → All of the pages, routes, context files, components
      - component → pages
      - App.css → css file for frontend
      - index.js → run file
    - package.json → Dependencies of the application
### Build and Deploy 
We used railway to deploy our project.
1. First, you need to fork this repository to create a repository in your github.
2. Then in Railway, you need to choose this repository for your project's repository.
3. The deployment branch should be the main branch and the root folder is "/server".
4. You need to build the project afterwards. This command must be run on client folder.
```
npm run build
```
5. After that, build files are created under the build folder under the client folder.
6. Then you must copy the files in that folder and paste to public folder under server folder instead of existing ones.
7. After that, you need to commit the changes to your main branch and push to origin. Auto deployment will start on railway. 
8. You can access the project from the url railway provides to you.
 

 
