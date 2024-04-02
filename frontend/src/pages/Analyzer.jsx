import React from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const Analyzer = () => {

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <div>
      <p>
        Welcome to the Automated Financial Analyzer! With just a click of a button, you can gain valuable insights into your finances
      </p>
      <p>How it works ? </p>
      <Button onClick={handleOpen} variant="filled">
        Guidance
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Step by Step Guidance</DialogHeader>
        <DialogBody>
            <p>1. Simply click the "Analyze" button to initiate the process.</p>
            <p>2. Sit back and relax while our advanced algorithms process your financial information.
            This may take a few moments depending on the complexity of your data.
            </p>
            <p>3. Once the analysis is complete, you'll be presented with a comprehensive overview of your financial situation.</p>
            <p>4. Based on the insights provided, you can make informed decisions to optimize your financial health. </p>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}

export default Analyzer
