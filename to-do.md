one nave bar, two ULs
toggle class
display none
display inline block

## Logged-in View
###### Workflow
* Check for cookie to see if user is logged in
* Click `Update` (built in Foundation)
* Fields
	* Name
	* Email
	* Password
	* Hometown
* Field values should populate from Orchestrate info
* Update Info button
	* should push info to Orchestrate

* Click `Logout`
	* Should cause user to be logged out.

## Logged-out View
###### Workflow
* Check for cookie to see if user is logged in
* Click Register (built in Foundation)
* Fields
	* Email
	* Password
	* Password Confirm
* Register Account button
	* Renders new_user_template (built in backbone)
* New User Template
	* Name
	* Email (populated w/email from Register modal)
	* Hometown
	* Save Info button 
		* Should push to Orchestrate
		* Then render Logged-In View with map
