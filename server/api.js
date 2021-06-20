import { Router } from "express";

const router = new Router();

router.get("/", (_, res) => {
	res.json({ message: "Hello, world!" });
});

router.get("/test", (_, res) => {
	res.json({ message: "Testing!" });
});

function fakeLogin(username, password){
		const logins = [{
			username: 'admin',
			password: 'admin',
			role: 'superadmin',
			id: 1,
		}]
	const userFound = logins.find(x => x.username === username && x.password === password);
	console.log(username, password);

	return userFound
	
}

/* All Users Login API */
router.post("/login", (req, res) => {

	const username = req.body.username;
	const password = req.body.password;
    const user = fakeLogin(username, password)

	if (!user) {
	  return res.status(401).send("username and password required");
	}
     req.session.username = user.username
     req.session.role = user.role
	 req.session.userId = user.id;

	 res.send('hello');

	
// 	pool
// 	  .query( userQuery, [username, password]
// 	  )
// 	  .then((result) => {
// 		if (result.rows.length > 0) {
// 		  return res.json(result.rows[0]);
// 		} else {
// 		  return res.status(404).send("user not available");
// 		}
// 	  });
//   });
});

router.get("/blah", (req, res) => {

	req.session.count +=1
	res.json( {
		username: req.session.username,
		count: req.session.count
	})
		 
})

export default router;
