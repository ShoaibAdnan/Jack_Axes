# JackAxes
 Jack Axes website overhaul

First of all, you have to download XAMPP from Apache’s website:

https://www.apachefriends.org/download.html

-	Download the latest version, which is 8.1.5.

-	After the latest version has been downloaded, run the installation for XAMPP and then save the program to C:/xampp, which is the recommended directory.

-	After XAMPP has been installed, take the project’s file (mainsite), and then divert into C:/xampp/htdocs/

-	Copy the project’s files (mainsite), and then paste it into the htdocs folder within the XAMPP directory in the C drive.

-	After that has been done, fire up XAMPP’s control panel and then click on the “Start” button next to Apache.

-	Next to the “MySQL”, click on the “config” button and then open “my.ini”

-	After my.ini has been opened, press on CTRL+F until you have gotten to this line: #master-user     =   <user> and this line #master-password = <password>, change their values to “root”.

-	Afterwards, go to this directory in the XAMPP directory: C;/xampp/phpMyAdmin/config.inc, and add “root” to $cfg['Servers'][$i]['password'] = ''; - between the ‘’ essentially, and the same applies to the username. Change [AllowNoPassword] to false, instead of true.

-	Afterwards, click on the “Start” button next to MySQL.

-	After that has been done, open your browser and type in the following link: localhost/phpMyAdmin/

-	Click on “NEW” on the left hand side, and create a new database with the name of “halimac_axe”

-	After that has been done, click on the “SQL” tab on the top, and then copy the component from “SQLScript.txt” to the SQL in the PhpmyAdmin tab, and then click on “Go” on the bottom right. 

-	After that has been done, open your browser and type in the following link: http://localhost/mainsite/anon_index.html

-	After that has been done, you should be able to see the website.
