

since it's a single page app, testing needs to be on the ui, in the browser
when a user visits https://snaporegon.herokuapp.com/ ---not passing
	the page should render with http status 200 or 300

	a google map should display
	
	the map should display oregon

	a marker for each oregon state park should appear
when a user visits http://snaporegon.herokuapp.com/, 
	the page should render with http status 200 or 300

	a google map should display
	
	the map should display oregon

	a marker for each oregon state park should appear

when a user clicks on a marker
	a window should appear with the name of that state park and a btn to view park content


when a user clicks on explore parks, login, register
	a modal window should appear

inside any modal
	if a user clicks outside of the modal
		the modal should go away
 	when the user clicks on the input
		a cursor should appear 
	when a user starts typing
		the text should appear in the input box


in explore parks modal
	when a user starts typing
		typeahead should display a list of parks
	when a user key press right arrow
		typeahead inserts the closest match to the users input
	when a user key press enter
		the input value is comleted
	when a user clicks on btn
		the modal should close
		flikr api should fire (can be viewed in chrome devTools)
		a park name will display below the map as a h1
		if flickr has any pictures of that park:
			pictures should append to the div#parksInfo
		else an error message displays that indicates that there arn't any pictures of that park
	if the user searches a park again
		the previous content of the div#parkInfo is removed from the dom
		new content is added to the dom that reflects the users query

in login modal:
	when a user starts typing
		text should appear
	if user has already registered and inserts an email address with a matching password
		navbar changes from login/register to logout and my account
	if user enters email and email doesn't exist
		not passing-error appears that says user does not appear, please register
	if user enters incorrect password
		not passing-error appears that says incorrect password, try again or reset password
in register modal
	when a user starts typing in an input
		text should appear in the input
	if user inserts email
		email should contain email form
		email should not already exist in database
	if password does not match password confirmation
		error: passwords do not match
	when user clicks register account btn
		if user info boxes are empty
			not passing-user is prompted to add content
		if email is a valid email address and
			not passing-password matches password confirmation
			location has text
		then
			modal should close, navbar should show logout and myaccount in navbar
			login and register should not appear in login
	when user clicks on logout
		navbar replaces logout and my account with login and register
	when user clicks my account
		update account modal should appear for the user to insert text for email,name, hometown, password, and password confirmation
		http put request should fire that replaces existing data into database