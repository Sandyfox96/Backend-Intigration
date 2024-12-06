const authenticateToken = require('../middleware/authMiddleware');


// Protect the update route
router.put("/:id", authenticateToken, updateCustomer);
