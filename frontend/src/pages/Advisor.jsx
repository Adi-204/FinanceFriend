import React, { useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Input
  } from "@material-tailwind/react";

const Advisor = () => {

    const [formData,setFormData] = useState({
        goal : ""
    })

    const [goals,setGoals] = useState([]);

    const onChangeHandle = (e)=>{
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const submitGoal = () =>{
        goals.push(formData.goal);
        setFormData({
            goal : ""
        })
    }

    const handleSubmit = () =>{
        // TODO
    }

    const deleteGoal = (id) => {
        const updatedGoals = goals.filter((goal, index) => index !== id);
        setGoals(updatedGoals);
    }

    const renderGoals = goals.map((goal,ind)=>{
        return (
            <div 
                key={ind}
                className='flex items-center justify-between m-5'
            >
                <Typography
                    color='black'
                    className='font-normal text-base'
                >
                    {goal}
                </Typography>
                <Button ripple={true} size='sm' onClick={() => deleteGoal(ind)}>Delete</Button>
            </div>
        )
    })

  return (
    <div className='flex items-center justify-center h-full '>
    <div className='flex-col'>
    <Card className="w-96 mt-10">
            <Typography
                variant='lead'
                color='black'
                className='font-medium mt-4 ml-10'
            >
                Add your Financial Goals
        </Typography>
        <CardBody>
            {renderGoals}
        </CardBody>
        <form onSubmit={handleSubmit}> 
            <div className="flex w-72 flex-col gap-6 ml-10">
                <Input 
                    variant="static" 
                    placeholder="Write your goal" 
                    name='goal'
                    value={formData.goal}
                    onChange={onChangeHandle}
                />
            </div>
            <CardFooter className="pt-0">
            <Button 
                onClick={submitGoal}
                className='mt-6 ml-3'
                size='sm'
                ripple={true}
            >
                Add Goal
            </Button>
            </CardFooter>
        </form>
      </Card>
        <div className='flex items-center justify-center mt-5'>
        <Button 
            onClick={submitGoal}
            ripple={true}
            >
            Get Plan
            </Button>
            </div>
        </div>
      </div>
  )
}

export default Advisor;
