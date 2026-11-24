import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Primary } from "./../Buttons";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { socket } from "./../../helpers/socket";

export default function AdminHeader({ agency }) {
    const addQueue = () => {
        const input = prompt("Add queue:");
        if (input === null) return;

        const name = input.trim();
        if (!name) {
            alert("Queue name is required.");
            return;
        }

        if (!socket.connected) {
            socket.connect();
            alert("Realtime connection is unavailable. Please try again once connected.");
            return;
        }

        socket.timeout(10000).emit(
            "addQueue",
            { agencyId: agency.agency_id, name },
            (error, response) => {
                if (error) {
                    alert("Queue creation timed out. Check your connection and try again.");
                    return;
                }

                if (!response?.success) {
                    alert(response?.message || "Unable to add queue.");
                }
            }
        );
    };

    const removeQueue = () => {
        const input = prompt("Remove queue ID:");
        if (input === null || !input.trim()) return;

        const queueId = Number(input);
        if (Number.isInteger(queueId) && queueId > 0) {
            if (!socket.connected) {
                socket.connect();
                alert("Realtime connection is unavailable. Please try again once connected.");
                return;
            }

            socket.emit("removeQueue", queueId);
        } else {
            alert("Enter a valid queue ID.");
        }
    };
    return (
        <>
            <Container maxWidth="lg">
                <Grid container justifyContent="space-around" alignItems="center" direction="row" sx={{ my: "25px" }}>
                    <Grid item xs={12} sm={4} md={3} sx={{ textAlign: "center" }}>
                        <img src={agency.logo} style={{ width: "120px" }} />
                    </Grid>
                    <Grid item xs={12} sm={4} md={5} py={3}>
                        <Typography
                            variant="h4"
                            sx={{
                                textAlign: "center",
                                alignItems: "center",
                                width: "100%",
                                fontSize: "1.8rem",
                            }}
                        >
                            {agency.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Primary value={"Add"} sx={{ fontSize: ".75rem" }} onClick={addQueue} />
                            <Primary value={"Remove"} sx={{ fontSize: ".75rem" }} onClick={removeQueue} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
