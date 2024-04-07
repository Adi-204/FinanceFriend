import React from 'react'
import { useState } from 'react'
import {
  Input,
  CardHeader,
  CardBody,
  Card,
  Radio,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Loading from '../components/Loading';

const Risk = () => {

  const api = useAxiosPrivate();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  const [formData, setFormData] = useState({
    risk : "",
    risk_rate : "",
    risk_amount : "",
    invest_time : "",
    invest_losses : "",
    loss_react : "",
  })

  const onChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const sendDetails = async () => {
      try {
        setLoading(true);
        const response = await api.post(`${import.meta.env.VITE_URL}/api/risk/finance`,formData);
        navigate('/features/risk/output',{
            state : {
                data : formData,
                financeOutput : response.data
            }
        });
      } catch (error) {
        setError(error.response.data);
      }
      finally {
        setFormData({
            risk : "",
            risk_rate : "",
            risk_amount : "",
            invest_time : "",
            invest_losses : "",
            loss_react : "",
        })
        setLoading(false);
      }
    }
    sendDetails();
  }

  if(loading){
    return <Loading />
  }

  return (
    <div className="my-20 mx-20 flex justify-center items-center">
      <Card className='lg:w-full w-96'>
        <CardHeader
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h4" color="black">
            Risk Assessment
          </Typography>
          <Typography variant='paragraph'>
            This is form to get know about you risk and lead your way to financial success
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4">
          <label>
            Can you tell me about a specific financial risk you're considering?
        </label>
            <div className='w-72'>
              <Input
                label='Risk'
                size="lg"
                placeholder="Risk of ......"
                type="text"
                required
                name="risk"
                value={formData.risk}
                onChange={onChangeHandler}
              />
            </div>
            <label>How much are you investing in your Financial Risk ?</label>
            <div className="w-72">
              <Input
                label='Risk Amount'
                size="lg"
                placeholder="$XXXXXX"
                type="text"
                required
                name="risk_amount"
                value={formData.risk_amount}
                onChange={onChangeHandler}
              />
            </div>
            <List>
              <label>What is your investment time horizon? </label>
              <ListItem className="p-0">
                <label
                  htmlFor="short term"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-3">
                    <Radio
                      id="short term"
                      name="invest_time"
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                      value="short term"
                      onChange={onChangeHandler}
                      required
                      checked={formData.invest_time === "short term"}
                    />
                  </ListItemPrefix>
                  <Typography
                    className="font-medium text-blue-gray-400"
                  >
                   Short Term
                  </Typography>
                </label>
              </ListItem>
                <ListItem className="p-0">
                <label
                    htmlFor="medium term"
                    className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                    <ListItemPrefix className="mr-3">
                    <Radio
                        name="invest_time"
                        id="medium term"
                        className="hover:before:opacity-0"
                        containerProps={{
                            className: "p-0",
                        }}
                        value="medium term"
                        onChange={onChangeHandler}
                        required
                        checked={formData.invest_time === "medium term"}
                    />
                    </ListItemPrefix>
                    <Typography
                        className="font-medium text-blue-gray-400"
                    >
                    Medium Term
                    </Typography>
                </label>
                </ListItem>
              <ListItem className="p-0">
                <label
                  htmlFor="long term"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-3">
                    <Radio
                      name="invest_time"
                      id="long term"
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                      value="long term"
                      onChange={onChangeHandler}
                      required
                      checked={formData.invest_time === "long term"}
                    />
                  </ListItemPrefix>
                  <Typography
                    className="font-medium text-blue-gray-400"
                  >
                    Long Term
                  </Typography>
                </label>
              </ListItem>
            </List>
            <List>
              <label>How comfortable are you with taking financial risks ?</label>
              <ListItem className="p-0">
                <label
                  htmlFor="Very Conservative"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-3">
                    <Radio
                      id="Very Conservative"
                      name="risk_rate"
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                      value="Very Conservative"
                      onChange={onChangeHandler}
                      required
                      checked={formData.risk_rate === "Very Conservative"}
                    />
                  </ListItemPrefix>
                  <Typography
                    className="font-medium text-blue-gray-400"
                  >
                    Very Conservative
                  </Typography>
                </label>
              </ListItem>
                <ListItem className="p-0">
                <label
                    htmlFor="Moderately Conservative"
                    className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                    <ListItemPrefix className="mr-3">
                    <Radio
                        name="risk_rate"
                        id="Moderately Conservative"
                        className="hover:before:opacity-0"
                        containerProps={{
                            className: "p-0",
                        }}
                        value="Moderately Conservative"
                        onChange={onChangeHandler}
                        required
                        checked={formData.risk_rate === "Moderately Conservative"}
                    />
                    </ListItemPrefix>
                    <Typography
                        className="font-medium text-blue-gray-400"
                    >
                    Moderately Conservative
                    </Typography>
                </label>
                </ListItem>
              <ListItem className="p-0">
                <label
                  htmlFor="Moderately Aggressive"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-3">
                    <Radio
                      name="risk_rate"
                      id="Moderately Aggressive"
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                      value="Moderately Aggressive"
                      onChange={onChangeHandler}
                      required
                      checked={formData.risk_rate === "Moderately Aggressive"}
                    />
                  </ListItemPrefix>
                  <Typography
                    className="font-medium text-blue-gray-400"
                  >
                    Moderately Aggressive
                  </Typography>
                </label>
              </ListItem>
               <ListItem className="p-0">
                <label
                  htmlFor="Very Aggressive"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-3">
                    <Radio
                      name="risk_rate"
                      id="Very Aggressive"
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                      value="Very Aggressive"
                      onChange={onChangeHandler}
                      required
                      checked={formData.risk_rate === "Very Aggressive"}
                    />
                  </ListItemPrefix>
                  <Typography
                    className="font-medium text-blue-gray-400"
                  >
                    Very Aggressive
                  </Typography>
                </label>
              </ListItem>
            </List>
            <List>
              <label>Have you experienced investment losses before ?</label>
              <ListItem className="p-0">
                <label
                  htmlFor="Yes"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-3">
                    <Radio
                      id="Yes"
                      name="invest_losses"
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                      value="Yes"
                      onChange={onChangeHandler}
                      required
                      checked={formData.invest_losses === "Yes"}
                    />
                  </ListItemPrefix>
                  <Typography
                    className="font-medium text-blue-gray-400"
                  >
                    Yes
                  </Typography>
                </label>
              </ListItem>
              <ListItem className="p-0">
                <label
                  htmlFor="No"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-3">
                    <Radio
                      id="No"
                      name="invest_losses"
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                      value="No"
                      onChange={onChangeHandler}
                      required
                      checked={formData.invest_losses === "No"}
                    />
                  </ListItemPrefix>
                  <Typography
                    className="font-medium text-blue-gray-400"
                  >
                    No
                  </Typography>
                </label>
              </ListItem>
            </List>
            {formData.invest_losses === "Yes" &&    
                <>
                    <label>
                    What were your emotions after facing invesment losses?
                    </label>
                    <div className="w-72">
                    <Input
                        label='Emotions'
                        size="lg"
                        placeholder="Anxious, Stress..."
                        type="text"
                        required
                        name="loss_react"
                        value={formData.loss_react}
                        onChange={onChangeHandler}
                    />
                    </div>
                </>
            }
            {error && <p>{error}</p>}
          </CardBody>
          <CardFooter>
            <Button className="mt-3" type='submit'>
              Get Analysis
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default Risk
