const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const roles = require("./Roles.json");
const admin = require("firebase-admin");
const { getDatabase } = require("firebase-admin/database");
const port = 5000;

// app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
var serviceAccount = require(__dirname + "/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://sugam-clean.appspot.com",
  databaseURL: "https://sugam-clean-default-rtdb.firebaseio.com/",
});

const db = getDatabase();

async function grantRole(currentUserUID, phno, role) {
  let user1; // user1 - Who added the other user as the role
  let user2; // user2 - Who is being assigned the role
  try {
    user1 = await admin.auth().getUser(currentUserUID);
  } catch (err) {
    return { ok: false, info: err.code };
  }

  try {
    user2 = await admin.auth().getUserByPhoneNumber(phno);
  } catch (err) {
    return { ok: false, info: err.code };
  }
  console.log(user1.customClaims);
  if (JSON.stringify(user1.customClaims) != "{}") {
    if (
      Boolean(
        roles[user1.customClaims.role].find(({ value }) => value === role)
      )
    ) {
      try {
        await admin
          .auth()
          .setCustomUserClaims(user2.uid, { role: role })
          .then(() => {
            const ref = db.ref("roleHistory");
            ref.push({ madeBy: user1.uid, madeTo: user2.uid, made: role });
          });
        return { ok: true, info: "Role Assigned Successfully" };
      } catch (err) {
        return { ok: false, info: err.code };
      }
    } else {
      return {
        ok: false,
        info: "Your role is not allowed to assign anyone " + role,
      };
    }
  } else {
    return { ok: false, info: "You are not elligible to assign anyone role" };
  }
  return { ok: true, info: null };
}
// grantRole("+917028799996");
async function trial() {
  try {
    await admin
      .auth()
      .setCustomUserClaims("FJkxMWudPNNHPjP4zphAe5scMX53", { role: "Admin" }).then(()=>console.log("success"));
  } catch (err) {
    console.log("error: " + err.code);
  }
}
// trial();
app.post("/api", async (req, res) => {
  const data = await grantRole(
    req.body.currentUser,
    req.body.phoneNumber,
    req.body.role
  );
  res.json(data);
  console.log(data);
});

app.get("/grantrole", (req, res) => {
  res.send(trial());
  console.log(req.body);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
