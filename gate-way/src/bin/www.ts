import { app } from "../index";

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>{
    console.log(`Gateway running on http://localhost:${PORT}`)
})