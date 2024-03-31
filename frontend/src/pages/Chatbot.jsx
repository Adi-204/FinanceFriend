import React, { useState } from 'react';
import {
  Radio,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import CustomChat from "./CustomChat";

const Chatbot = () => {
  const [selectedOption, setSelectedOption] = useState("");
 

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

 
  return (
    <div>
    <div className="flex justify-center mt-5">
    <Card className="w-full max-w-[24rem]">
      <List className="flex-row">
        <ListItem className="p-0">
          <label
            htmlFor="inbuilt"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Radio
               name="type" 
               id='inbuilt'
               value='inbuilt'
               onChange={() => handleOptionChange('inbuilt')}
               checked={selectedOption === 'inbuilt'}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography
              className="font-medium"
            >
              In-built Prompt
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0">
          <label
            htmlFor="custom"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Radio
                 name="type" 
                 id='custom'
                 value='custom'
                 onChange={() => handleOptionChange('custom')}
                 checked={selectedOption === 'custom'}
                className="hover:before:opacity-0"
                containerProps={{
                      className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography
              className="font-medium"
            >
              Custom Prompt
            </Typography>
          </label>
        </ListItem>
      </List>
    </Card>
    </div>
    {selectedOption === 'inbuilt' && <p>Show In-built Prompt Content</p>}
    {selectedOption === 'custom' && <CustomChat />} 
    </div>
  );
};

export default Chatbot;

