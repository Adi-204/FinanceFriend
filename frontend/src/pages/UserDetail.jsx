import React from 'react'
import { useState,useEffect } from 'react'
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
  Checkbox
} from "@material-tailwind/react";
import axios from "axios";
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const UserDetail = () => {

    const {accessToken} = useAuth();
    const navigate = useNavigate();

    const [formData,setFormData] = useState({
        employement_status : "",
        monthly_inc : "",
        monthly_exp : "",
        monthly_savings : "",
        debt_amount : "",
        stocks : false,
        real_estate : false,
        crypto : false,
        mutual_funds : false
    })

    const onChangeHandler = (e) =>{
      const {name,value,type,checked} = e.target;
      setFormData((prevData)=>{
        return {
          ...prevData,
          [name] : type === "checkbox" ? checked : value
        }
      })
    }

    const handleSubmit = (e) =>{
      e.preventDefault();
      const sendDetails = async()=>{
         try {
          console.log(accessToken);
           const response = await axios.post('/api/user/getDetails',formData,{
            headers : {
              Authorization : `Bearer ${accessToken}`
            }
           });
           navigate('/');
         } catch (error) {
            console.log(error);
         }
         finally{
            setFormData({
              employement_status : "",
              monthly_inc : "",
              monthly_exp : "",
              monthly_savings : "",
              debt_amount : "",
              stocks : false,
              real_estate : false,
              crypto : false,
              mutual_funds : false
            })
         }
      } 
      sendDetails();
    }

  return (
      <div className="my-20 mx-20 flex justify-center items-center">
        <Card className='lg:w-full w-96'>
            <CardHeader
              className="mb-4 grid h-28 place-items-center"
            >
            <Typography variant="h4" color="black">
                Financial Details
            </Typography>
            <Typography variant='paragraph'>
              This is form to get know about you more and lead your way to financial success
            </Typography>
            </CardHeader>
            <form onSubmit={handleSubmit}>
            <CardBody className="flex flex-col gap-4">
            <List>
              <label>What is your employment status ? </label>
                  <ListItem className="p-0">
                    <label
                      htmlFor="Employed"
                      className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                      <ListItemPrefix className="mr-3">
                        <Radio
                          name="employement_status"
                          id="Employed"
                          className="hover:before:opacity-0"
                          containerProps={{
                            className: "p-0",
                          }}
                          value="Employed"
                          onChange={onChangeHandler}
                          required
                          checked={formData.employement_status === "Employed"}
                        />
                      </ListItemPrefix>
                      <Typography
                        color="blue-gray"
                        className="font-medium text-blue-gray-400"
                      >
                        Employed
                      </Typography>
                    </label>
                  </ListItem>
                  <ListItem className="p-0">
                    <label
                      htmlFor="Self-Employed"
                      className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                      <ListItemPrefix className="mr-3">
                      <Radio
                          name="employement_status"
                          id="Self-Employed"
                          className="hover:before:opacity-0"
                          containerProps={{
                            className: "p-0",
                          }}
                          value="Self-Employed"
                          onChange={onChangeHandler}
                          required
                          checked={formData.employement_status === "Self-Employed"}
                        />
                      </ListItemPrefix>
                      <Typography
                        color="blue-gray"
                        className="font-medium text-blue-gray-400"
                      >
                        Self-Employed
                      </Typography>
                    </label>
                  </ListItem>
                  <ListItem className="p-0">
                    <label
                      htmlFor="Unemployed"
                      className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                      <ListItemPrefix className="mr-3">
                      <Radio
                          name="employement_status"
                          id="Unemployed"
                          className="hover:before:opacity-0"
                          containerProps={{
                            className: "p-0",
                          }}
                          value="Unemployed"
                          onChange={onChangeHandler}
                          required
                          checked={formData.employement_status === "Unemployed"}
                        />
                      </ListItemPrefix>
                      <Typography
                        color="blue-gray"
                        className="font-medium text-blue-gray-400"
                      >
                        Unemployed
                      </Typography>
                    </label>
                  </ListItem>
                </List>
                <label>What is your Monthly Income?</label>
                <div className="w-72">
                <Input
                    label='Monthly Income'
                    size="lg"
                    placeholder="$XXXXXX"
                    type="text"
                    required
                    name="monthly_inc"
                    value={formData.monthly_inc}
                    onChange={onChangeHandler}
                />
                </div>
                <label>What is your Monthly Expenses?</label>
                <div className="w-72">
                  <Input
                      label='Monthly Expenses'
                      size="lg"
                      placeholder="$XXXXXX"
                      type="text"
                      required
                      name="monthly_exp"
                      value={formData.monthly_exp}
                      onChange={onChangeHandler}
                  />
                </div>
                <label>What is your Monthly Svaings?</label>
                <div className='w-72'>
                <Input
                    label='Monthly Svaings'
                    size="lg"
                    placeholder="$XXXXXX"
                    type="text"
                    required
                    name="monthly_savings"
                    value={formData.monthly_savings}
                    onChange={onChangeHandler}
                />
                <List>
                <label>What is your Investment Preference ? (If any)</label>
                <ListItem className="p-0">
                  <label
                    htmlFor="stocks"
                    className="flex w-full cursor-pointer items-center"
                  >
                    <ListItemPrefix className="mr-3">
                      <Checkbox
                        id="stocks"
                        className="hover:before:opacity-0"
                        name="stocks"
                        checked={formData.stocks}
                        onChange={onChangeHandler}
                      />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="font-medium">
                        Stocks
                    </Typography>
                  </label>
                </ListItem>
                <ListItem className="p-0">
                  <label
                    htmlFor="real_estate"
                    className="flex w-full cursor-pointer items-center"
                  >
                    <ListItemPrefix className="mr-3">
                      <Checkbox
                        id="real_estate"
                        className="hover:before:opacity-0"
                        name="real_estate"
                        checked={formData.real_estate}
                        onChange={onChangeHandler}
                      />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="font-medium">
                      Real Estate
                    </Typography>
                  </label>
                </ListItem>
                <ListItem className="p-0">
                  <label
                    htmlFor="crypto"
                    className="flex w-full cursor-pointer items-center"
                  >
                    <ListItemPrefix className="mr-3">
                      <Checkbox
                        id="crypto"
                        className="hover:before:opacity-0"
                        name="crypto"
                        checked={formData.crypto}
                        onChange={onChangeHandler}
                      />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="font-medium">
                      Cryptocurrencies
                    </Typography>
                  </label>
                </ListItem>
                <ListItem className="p-0">
                  <label
                    htmlFor="mutual_funds"
                    className="flex w-full cursor-pointer items-center"
                  >
                    <ListItemPrefix className="mr-3">
                      <Checkbox
                        id="mutual_funds"
                        className="hover:before:opacity-0"
                        name='mutual_funds'
                        checked={formData.mutual_funds}
                        value="mutual_funds"
                        onChange={onChangeHandler}
                      />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="font-medium">
                      Mutual Funds
                    </Typography>
                  </label>
                </ListItem>
              </List>
                </div>
                <label>What is debt amount? (If any)</label>
                <div className='w-72'>
                 <Input
                    label='Debt Amount'
                    size="lg"
                    placeholder="$XXXXXX"
                    type="text"
                    name="debt_amount"
                    value={formData.debt_amount}
                    onChange={onChangeHandler}
                />
                </div>
            </CardBody>
            <CardFooter>
              <Button className="mt-3" type='submit'> 
                Submit
              </Button>
            </CardFooter>
            </form>
        </Card>
        </div>
  )
}

export default UserDetail
