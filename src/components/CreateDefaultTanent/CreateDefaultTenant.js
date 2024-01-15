import React, { useState } from "react";
import "./index.css";
import { instance } from "Fetch";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Backdrop from "@mui/material/Backdrop";
import LinearProgress from "@mui/joy/LinearProgress";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import InfoOutlined from "@mui/icons-material/InfoOutlined";

const CreateDefaultTenant = () => {
  let navigate = useNavigate();
  const [name, setName] = useState("Softel Communications Inc");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      name: name,
      userName: email,
    };
    try {
      const response = await instance.post("/createdefaulttenant", data);

      console.log("s", response.data);
      if (response.status === 200) {
        toast.error(response.data.err_msg);
        navigate("/");
        return;
      } else if (response.status === 201) {
        toast.success(response.data.message);
        navigate("/");
      } else if (response.status === 500) {
        toast.error(response.data.err_msg);
      }
    } catch (error) {
      // Handle any errors that may occur during the API call
      console.error("Error sending data:", error);
    } finally {
      setLoading(false);
    }
    console.log({ name, email });
  };

  return (
    <>
      <div className="createDefaultTenantDiv">
        <Backdrop
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <LinearProgress
            color="primary"
            size="sm"
            sx={{ width: "100%", position: "absolute", top: 0 }}
            variant="soft"
          />
        </Backdrop>

        <Card
          variant="outlined"
          sx={{
            maxHeight: "max-content",
            maxWidth: "100%",
            width: "30%",
            mx: "auto",
            overflow: "auto",
            // marginTop:'10%'
          }}
        >
          <Typography level="title-lg" startDecorator={<InfoOutlined />}>
            Create Default Tenant
          </Typography>
          <Divider inset="none" />
          <form onSubmit={handleSubmit}>
            <CardContent
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(1, minmax(80px, 1fr))",
                gap: 1.5,
              }}
            >
              <FormControl sx={{ gridColumn: "1" }}>
                <FormLabel>Default Tenant Name</FormLabel>
                <Input
                  placeholder="Softel Communications Inc"
                  defaultValue={"Softel Communications Inc"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ gridColumn: "1" }}>
                <FormLabel>Root User Email Id</FormLabel>
                <Input
                  placeholder="sample_account@microsoft.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <CardActions sx={{ gridColumn: "1/-1" }}>
                <Button type="submit" variant="solid" color="primary">
                  Submit
                </Button>
              </CardActions>
            </CardContent>
          </form>
        </Card>
      </div>
    </>
  );
};

export default CreateDefaultTenant;
