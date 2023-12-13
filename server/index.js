const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const { Schema } = mongoose;

const userSchema2 = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    age: { type: Number, required: true },
  },
  { timestamps: true }
);

const Users2 = mongoose.model("basket", userSchema2);

app.get("/users2", async (req, res) => {
  try {
    const users = await Users2.find({});
    res.send(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
app.get("/users2/:id", async (req, res) => {
  try {
    const user = await Users2.findById(req.params.id);

    res.send(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.post("/users2", async (req, res) => {
  try {
    const user = new Users2(req.body);
    user.save();
    res.status(200).json({ message: "yaradni user" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.delete("/users2/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Users2.findByIdAndDelete(id).exec();
    res.send(data);
  } catch (error) {
    res.status(500);
  }
});

app.put("/users2/:id", async (req, res) => {
    const { id } = req.params
    try {
        const user = await Users2.findByIdAndUpdate(id, req.body)
        if (user) {
            await user.save()
            res.json(user)
        }
        else {
            res.status(404).json({ message: "tapmadi" })
        }
    } catch (error) {
        res.status(500).json({ message: error })

    }

})

const PORT = process.env.PORT;
const url = process.env.CONNECTION_URL.replace(
  "<password>",
  process.env.PASSWORD
);

mongoose.connect(url).catch((err) => console.log("Db not connect" + err));

app.listen(PORT, () => {
  console.log("Server Connection");
});
