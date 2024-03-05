// Write your "actions" router here!
const express = require("express");
const router = express.Router();
const Action = require("./actions-model");

router.get("/", (req, res, next) => {
  Action.get()
    .then((actions) => {
      res.json(actions);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  Action.get(req.params.id)
    .then((action) => {
      if (!action) {
        res.status(404).json({
          message: "Nothing found at ID",
        });
      } else {
        res.json(action);
      }
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  if (
    !req.body.notes ||
    !req.body.description ||
    req.body.completed === undefined ||
    !req.body.project_id
  ) {
    res.status(400).json({
      mesasge: "Must provide all fields",
    });
  }
  Action.insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch(next);
});

router.put("/:id", (req, res, next) => {
  if (!req.params.id) {
    res.status(404).json({
      message: "ID invalid :(",
    });
  }
  if (
    !req.body.notes ||
    !req.body.description ||
    req.body.completed === undefined ||
    !req.body.project_id
  ) {
    res.status(400).json({
      mesasge: "Must provide all fields",
    });
  }
  Action.update(req.params.id, req.body)
    .then((updatedAction) => {
      res.status(201).json(updatedAction);
    })

    .catch(next);
});



router.delete('/:id', (req, res, next) => {
    Action.remove(req.params.id) 
        .then(resp => {
            if(!resp) {
            res.status(404).json({
                message: "no ID found"
            })
            } else {
                res.status(204).json(resp)
            }
        }) .catch(next)
})


router.use((err, req, res, next) => {
  // eslint-disable-line
  console.error(err);
  res.status(err.status || 500).json({
    customMessage: "Not exactly what im looking for",
    message: err.message,
    stack: err.stack,
  });
});


module.exports = router;
