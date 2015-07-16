

since it's a single page app, testing needs to be on the ui, in the browser
when a user visits http://snaporegon.herokuapp.com/, 
	the page should render with http status 200 or 300

	a google map should display
	
	the map should display oregon

	a marker for each oregon state park should appear

when a user clicks on a marker
	a window should appear with the name of that state park and a btn to view park content


when a user clicks on discover photos, explore parks, login, register
	a modal window should appear

inside any modal
	if a user clicks outside of the modal
		the modal should go away
 	when the user clicks on the input
		a cursor should appear 
	when a user starts typing, the text should appear in the input box


in explore parks modal
	when a user starts typing
		typeahead should start up
	when a user clicks on btn or key presses enter
		a new window should appear with data about that state park and pictures of that state park

in discover photos modal
	when a user clicks on btn or key presses enter
		a new window should appear with photos of state parks with that feature

in login modal:
	if user inserts accurate and matching password/email
		web page changes from login/register, to welcome username, logout btn
		username is added to cookies
	if user clicks logout btn
		user is redirected to homepage, cookies are cleared
	if user enters email and email doesn't exist
		error appears that says user does not appear, please register
	if user enters incorrect password
		error appears that says incorrect password, try again or reset password
in register modal
	if user inserts email
		email should contain email form
		email should not already exist in database
	if password does not match password confirmation
		error: passwords do not match
	if passwords match and email element is filled out correctly, and user clicks register btn
		user successfully logs in
		user is prompted for name, home address
	when user clicks add info btn
		if user info boxes are empty
			user is prompted to add content
		marker element is added to map with different color and info box that dispays home