import React,{useEffect, useState} from 'react'
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Loading from "../components/Loading";
import imgSrc from '../assets/profile.jpg';
import UpdateUser from './UpdateUser';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import UpdateFinance from './UpdateFinance';


const DashBoard = () => {

  const [activeTab, setActiveTab] = useState("personal");
  const [error, setError] = useState("");
  const [loading,setLoading] = useState(false);
  const [personalDetails,setPersonalDetails] = useState({});
  const [financeDetails,setFinanceDetails] = useState({});

  const api = useAxiosPrivate();

  useEffect(()=>{
      if(activeTab === 'personal' && Object.keys(personalDetails).length === 0){
        const getPersonal = async() =>{
            try {
              setLoading(true);
              const response = await api.get(`${import.meta.env.VITE_URL}/api/dashboard/personal`);
              setPersonalDetails(response.data);
            } catch (error) {
              setError(error.response.data);
            }
            finally{
              setLoading(false);
            }
        }
        getPersonal();
      }
      if (activeTab === 'finance' && Object.keys(financeDetails).length === 0) {
        const getFinance = async () => {
            try {
                setLoading(true);
                const response = await api.get(`${import.meta.env.VITE_URL}/api/dashboard/finance`);
                setFinanceDetails(response.data);
            } catch (error) {
                setError(error.response.data);
            } finally {
                setLoading(false);
            }
        }
        getFinance();
    }
  },[activeTab]);

  const personalData = (user) => {
    return (
      <div className="flex flex-wrap items-center gap-8">
        <div className="lg:h-48 lg:w-48 w-36 h-36 rounded-lg bg-gray-300">
          <img src={imgSrc} />
        </div>
        <Card className="lg:w-[40vw] lg:h-[50vh] w-[80vw] shadow-lg mt-4">
          <CardBody>
            <Typography variant="h3" color="black" className="mb-6">
              Personal Information
            </Typography>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Typography className="text-black text-lg font-bold">Name</Typography>
                <Typography>{user.firstname} {user.lastname}</Typography>
              </div>
              <div>
                <Typography className="text-black text-lg font-bold">Email</Typography>
                <Typography>{user.email}</Typography>
              </div>
              <div>
                <Typography className="text-black text-lg font-bold">Age</Typography>
                <Typography>{user.userAge}</Typography>
              </div>
              <div>
                <Typography className="text-black text-lg font-bold">Country</Typography>
                <Typography>{user.userCountry}</Typography>
              </div>
              <div>
                <Typography className="text-black text-lg font-bold">Profession</Typography>
                <Typography>{(user.userProfession) || "--"}</Typography>
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <UpdateUser personDetail={personalDetails} setPersonDetail={setPersonalDetails} />
          </CardFooter>
        </Card>
      </div>
    );
  };

  const financeData = (user) =>{
    console.log(user);
    let renderInvest;
    if(user.investment_pref[0] !== ''){
      renderInvest = user.investment_pref.map((val)=>{
        return (
          <div>
            {val === 'stocks' && <p>Stocks</p>}
            {val === 'real_estate' && <p>Real Estate</p>}
            {val === 'crypto' && <p>Cryptocurrencies</p>}
            {val === 'stocks' && <p>Mutual Funds</p>}
          </div>
        )
      })
    }
    return (
      <div className="flex flex-wrap items-center gap-8">
        <div className="lg:h-48 lg:w-48 w-36 h-36 rounded-lg bg-gray-300">
          <img src={imgSrc} />
        </div>
        <Card className="lg:w-[40vw] lg:h-[63vh] w-[80vw] shadow-lg mt-4">
          <CardBody>
            <Typography variant="h3" color="black" className="mb-6">
              Financial Information
            </Typography>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Typography className="text-black text-lg font-bold">Employment Status</Typography>
                <Typography>{user.emply_status}</Typography>
              </div>
              <div>
                <Typography className="text-black text-lg font-bold">Monthly Income</Typography>
                <Typography>${user.monthly_inc}</Typography>
              </div>
              <div>
                <Typography className="text-black text-lg font-bold">Monthly Expense</Typography>
                <Typography>${user.monthly_exp}</Typography>
              </div>
              <div>
                <Typography className="text-black text-lg font-bold">Monthly Savings</Typography>
                <Typography>${user.monthly_sav}</Typography>
              </div>
              <div>
                <Typography className="text-black text-lg font-bold">Debt</Typography>
                <Typography>${user.debt}</Typography>
              </div>
              <div>
                <Typography className="text-black text-lg font-bold">Investment Preference</Typography>
                <Typography>{ user.investment_pref[0] !== '' ? renderInvest : "--"}</Typography>
              </div> 
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <UpdateFinance financeDetail={financeDetails} setFinanceDetail={setFinanceDetails} />
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  const data = [
    {
      label: "Personal Details",
      value: "personal",
      desc: personalData(personalDetails) ,
    },
    {
      label: "Financial Details",
      value: "finance",
      desc: Object.keys(financeDetails).length === 0 ? <Loading /> : financeData(financeDetails),
    }
  ];

  if(loading){
    return <Loading />;
  }

  return (
    <div className="flex justify-center h-screen mt-10 ">
    <Tabs value={activeTab} className="lg:w-[75vw] w-[90vw]" >
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
        indicatorProps={{
          className:
            "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={activeTab === value ? "text-gray-900" : ""}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value} style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
    </div>
  )
}

export default DashBoard;
