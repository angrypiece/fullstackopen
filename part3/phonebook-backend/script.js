const express = require("express");
const app = express();

app.get("/api/persons", (req, res) =>{
    
})


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
