"use client";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Slide from "@mui/material/Slide";
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Box, CircularProgress, Stack, TextField, IconButton } from '@mui/material';
import {
  Button,
} from "@nextui-org/react";
import React, { Dispatch, useContext, useState } from "react";
import axios from "axios";
import { Dialog, DialogTitle } from "@mui/material";
import dayjs from "dayjs";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { convertGhsToEth } from "@/utils/functions";

const Transition = React.forwardRef(function Transition(
  props,
  ref,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Search = () => {
  const router = useRouter();
  const { account, selInsurance, payForInsurance, setInsurance } = useContext(AppContext)

  const [isOpen, setIsOpen] = useState(false);

  //route to login
  const [fromList, setFromList] = useState([]);
  const [toList, setToList] = useState([]);
  const [source, setSource] = useState(null);
  const [dest, setDest] = useState(null);
  const [openAirportSearch, setOpenAirportSearch] = useState(false);
  const [isFrom, setIsFrom] = useState(true);
  const [departDate, setDepartDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [returnDate, setReturnDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [isLoading, setIsLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  //dropdown
  const [showFlightOptions, setShowFlightOptions] = useState(false);
  const [cabinClass, setCabinClass] = useState("economy");
  const [adults, setAdults] = useState(1);

  //Flight Data
  const [flights, setFlights] = useState([]);
  const [searchText, setSearchText] = useState("")
  const [openLoading, setOpenLoading] = useState(false);
  const [txHash, setTxHash] = useState(null)

  const handleChange = (searchText, setData) => {
    if (searchText.length < 3) return;
    setSearching(true);
    axios.get("/api/airport-search", {
      params: { search: searchText },
    }).then(res => {
      console.log(res.data.content);
      setData(res.data.content);
    }).catch(error => {
      console.error("Error fetching data:", error);
    }).finally(() => {
      setSearching(false);
    });
  };

  const fetchFlight = async () => {
    try {
      setIsLoading(true)
      const res =
        await axios.get("/api/oneway", {
          params: {
            fromEntityId: source.skyId,
            toEntityId: dest.skyId,
            departDate,
            adults,
            cabinClass,
          }
        })
      setFlights(res.data.content)
      setIsOpen(!isOpen)
      console.log(res.data.content)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false)
    }

  }
  return (
    <>
      <div className="h-[100vh] bg-black mt-24 flex ">
        <div className="flex flex-col gap-[2rem]  ">
          <div>
            <p className="text-white  text-[20px] ml-[6rem] font-bold">
              Lot of flights. One Simple Search
            </p>
          </div>
          <div className="flex items-center ml-[6rem] gap-1">
            <div
              onClick={() => {
                setIsFrom(true)
                setOpenAirportSearch(!openAirportSearch)
              }} className="flex flex-col rounded-l-[20px] cursor-pointer bg-white p-4 w-[12vw] gap-4">
              <p className="text-[12px] font-bold">From</p>
              <p className="text-[12px]">{source ? source.suggestionTitle : "Where are you"}</p>
              {/* <input
                type="text"
                onChange={(e) => {
                  handleChange(e, setFromList);
                }}
                placeholder="country,city or airpot"
                className="outline-none text-[12px] "
              /> */}

              {/* <p className='font-bold text-[12px]'>Accra (ACC)</p> */}
            </div>
            <div className="bg-white flex items-center justify-center cursor-pointer border-[3.5px] border-black h-[40px] w-[40px] rounded-full absolute ml-[10.5vw] ">
              <ArrowForwardIos className="text-[10px]" />
              <ArrowBackIos className="text-[10px] " />
            </div>
            <div
              onClick={() => {
                setIsFrom(false)
                setOpenAirportSearch(!openAirportSearch)
              }}
              className="flex flex-col bg-white cursor-pointer p-4 w-[15vw] gap-4">
              <p className="text-[12px] ml-2 font-bold">Too</p>
              <p className="text-[12px]">{dest ? dest.suggestionTitle : "Where are you going"}</p>
              {/* <input
                type="text"
                placeholder="country,city or airpot"
                onChange={(e) => {
                  handleChange(e, setToList);
                }}
                className="outline-none text-[12px] "
              /> */}

              {/* <p className='font-bold text-[12px] ml-2'>Country City or Airpot</p> */}
            </div>
            <div className="flex flex-col bg-white cursor-pointer p-4 w-[12vw] gap-4">
              <p className="text-[12px] font-bold">Depart</p>
              <input
                value={departDate}
                onChange={(e) => setDepartDate(dayjs(e.target.value).format("YYYY-MM-DD"))}
                min={dayjs().format("YYYY-MM-DD")}
                type="date"
                placeholder="Add date"
                className="text-[12px] outline-none"
              />
              {/* <p className='font-bold text-[12px]'>Add date</p> */}
            </div>
            <div className="flex flex-col bg-white cursor-pointer p-4 w-[12vw] gap-4">
              <p className="text-[12px] font-bold">Return</p>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(dayjs(e.target.value).format("YYYY-MM-DD"))}
                min={dayjs().format("YYYY-MM-DD")}
                placeholder="Add date"
                className="text-[12px] outline-none"
              />
              {/* <p className='font-bold text-[12px]'>Add date</p> */}
            </div>
            <div
              onClick={() => {
                setShowFlightOptions(!showFlightOptions);
              }}
              className="flex flex-col bg-white cursor-pointer p-4 w-[18vw] rounded-r-[20px] gap-4"
            >
              <p className="text-[12px] font-bold">Travelers & Cabin Class</p>
              <p className="text-[12px]">
                {adults} Adult,{" "}
                {cabinClass === "first"
                  ? "First Class"
                  : cabinClass === "business"
                    ? "Business"
                    : "Economy"}
              </p>
            </div>
            <Button
              disabled={!source || !dest || !departDate || !returnDate || isLoading}
              onClick={async () => {
                await fetchFlight()
              }}
              className="bg-[#FFC700] items-center cursor-pointer hover:bg-[#ebc745] justify-center w-[8vw] rounded-[20px] ml-[1rem] flex flex-col p-3 h-[15vh]"
            >{
                isLoading ? <CircularProgress
                /> : (
                  <>
                    <p className="text-[12px] font-bold">Search</p>
                    <p className="text-[12px] font-bold">Flights</p>
                  </>
                )
              }

            </Button>
          </div>


        </div>
      </div>
      {/* Dialogs */}
      <Dialog
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setShowFlightOptions(!showFlightOptions);
        }}
        open={showFlightOptions}
      >
        <DialogTitle className="text-center font-bold text-xl">
          Flight Options
        </DialogTitle>
        <div className="bg-white p-4">
          <div className="flex items-center  gap-2">
            <p className="text-[12px] font-bold ">Cabin Class</p>
            <select
              name=""
              id="cabinClass"
              value={cabinClass}
              onChange={(e) => {
                setCabinClass(e.target.value);
              }}
              className="text-[10px] outline-none"
            >
              <option selected value="economy">
                Economy
              </option>
              <option value="business">Business</option>
              <option value="first">First Class</option>
            </select>
          </div>
          <div>
            <div className="flex ">
              <p>Adults</p>
              <input
                type="number"
                value={adults}
                onChange={(e) => setAdults(parseInt(e.target.value))}
                className="outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => {
                  setShowFlightOptions(!showFlightOptions);
                }}
                className="bg-[#FFC700] w-full mt-4 hover:bg-[#ebc745] text-[#000000] px-4 py-2 rounded-[30px]">
                Done
              </Button>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </Dialog>

      {/* search Modal */}
      <Dialog
        TransitionComponent={Transition}
        keepMounted
        sx={{
          borderRadius: "20px"
        }}
        onClose={() => {
          setIsOpen(!isOpen);
        }}
        open={isOpen}
      >
        <Box sx={{
          padding: "25px"
        }}>
          <DialogTitle className="text-center font-bold text-2xl">
            <p className="text-[20px]">Available Flights</p>
            <p className="text-[12px] text-gray-400">
              *Flights Insurance prices may vary
            </p>
          </DialogTitle>
          <>
            <div className="flex p-4 flex-col gap-6">
              {flights.length === 0 ? <p className="text-center text-2xl font-bold">No flights available</p> : flights.map((flight, index) => (
                <div key={index} className="flex gap-4 items-center bg-white w-[35vw] border-[1px] border-gray-400  rounded-[20px] p-4 gap-2">
                  <div className="flex justify-center flex-col items-center gap-1">
                    <img className="h-[5vh]" src={flight.airlines[0].logoUrl} alt="awa logo" />
                    <p className="text-center text-[10px]">{flight.airlines[0].name}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    {/* <p className="text-[12px]">{extractHourAndMinute(flight.arrival)}</p> */}
                    <p className="text-[12px] font-bold">{source.suggestionTitle}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-[10px]">{calculateTimeDifference(flight.arrival, flight.depature)}</p>
                    <div className="flex items-center gap-2">
                      <div className="w-[10vw] h-[1px] bg-gray-400"></div>
                      <img className="h-[2vh]" src="/Vector.png" alt="flight" />
                    </div>
                    <p className="text-[10px] text-blue-800">One Way</p>
                  </div>
                  <div>
                    <div className="flex flex-col items-center">
                      {/* <p className="text-[12px]">{extractHourAndMinute(flight.arrival)}</p> */}
                      <p className="text-[12px] font-bold">{dest.suggestionTitle}</p>
                    </div>
                  </div>
                  <div className="w-[1px] h-[12vh] bg-gray-400"></div>
                  <div className="flex flex-col items-center ">
                    <p className="text-[8px]">Insurance Price</p>
                    <p className="text-[14px] font-bold">¢ {flight.insurancePrice}</p>
                    <button
                      onClick={async () => {
                        setInsurance({
                          fromEntityId: source.suggestionTitle,
                          toEntityId: dest.suggestionTitle,
                          departDate,
                          returnDate,
                          cabinClass,
                          adults,
                          ...flight
                        })
                        if (!account) {
                          alert("Connect your wallet")
                        } else {
                          try {
                            //TODO: Changed amount divide by 4 (For testing purpose)
                            const fAmount = await convertGhsToEth(((parseInt(flight.insurancePrice) * 0.1) + parseInt(flight.insurancePrice))/5)
                            if (confirm(`You are about pay ${fAmount.toFixed(5)} ETH`)) {
                              setOpenLoading(true)
                              await payForInsurance(fAmount).then((r) => {
                                setTxHash(r.transactionHash)
                              }).catch((e) => {
                                setOpenLoading(false)
                                alert(e.message.toString().includes("insufficient funds for gas")
                                  ? "Insufficient balance to process this transaction. Please top up your wallet and try again."
                                  : e.message)
                              });
                            }
                          } catch (error) {
                            setOpenLoading(!openLoading)
                            console.error(error)
                          }
                        }
                      }}
                      className="bg-blue-900 text-white p-[4px] w-[15vw] text-center text-[10px] w-[6vw] rounded-[20px] hover:bg-blue-700 ">
                      Purchase
                    </button>
                  </div>
                </div>
              ))}



            </div>
          </>
        </Box>
      </Dialog>

      {/* Airport Search Modal */}
      <Dialog
        TransitionComponent={Transition}
        keepMounted
        sx={{
          borderRadius: "20px"
        }}
        onClose={() => {
          setOpenAirportSearch(!openAirportSearch);
        }}
        open={openAirportSearch}
      >
        <Box sx={{
          padding: "40px"
        }}>
          <DialogTitle className="text-center font-bold text-2xl">
            <p className="text-[20px]">{isFrom ? "Where are you?" : "Where are you going to"}</p>
            <p className="text-[12px] text-gray-400">
              Search City, Country or Airport
            </p>
          </DialogTitle>

          <Autocomplete
            freeSolo
            options={isFrom ? fromList || [] : toList || []}
            getOptionLabel={(option) => option.suggestionTitle} // Adjust this to match your data structure
            onChange={(e, newValue) => {
              if (newValue) {
                console.log(newValue); // Log the skyId of the selected option
                isFrom ? setSource(newValue) : setDest(newValue);
              }

            }}
            renderInput={(params) => (
              <Stack flexDirection="row" spacing={2} alignItems="center">
                <TextField
                  {...params}
                  placeholder="Country, City, or Airport"
                  onChange={(e) => {
                    setSearchText(e.target.value)
                  }}
                  className="outline-none border-none text-[12px]"
                />
                <IconButton
                  sx={{ backgroundColor: "#FFC700" }}
                  onClick={() => {
                    handleChange(searchText, isFrom ? setFromList : setToList);
                  }}
                >
                  <SearchIcon sx={{ color: "black" }} />
                </IconButton>
              </Stack>
            )}
          />
          <Button
            disabled={searching}
            onClick={() => {
              setSearchText("")
              setOpenAirportSearch(!openAirportSearch)
              isFrom ? setFromList([]) : setToList([])
            }}
            className="bg-[#FFC700] w-full mt-4 hover:bg-[#ebc745] text-[#000000] px-4 py-2 rounded-[30px]">
            {searching ? "Searching..." : "Done"}
          </Button>
        </Box>
      </Dialog>

      
      <Dialog
        TransitionComponent={Transition}
        keepMounted
        open={openLoading}
        sx={{
          padding: "40px"
        }}>
        <Box sx={{
          padding: "40px"
        }}>
          <DialogTitle className="text-center font-bold text-2xl mb-4">{txHash ? "Transaction sent successfully" : "Processing transaction..."}</DialogTitle>
          <Stack justifyContent={"center"} alignItems={"center"} className="w-full">
            {
              txHash ? (
                <Stack justifyContent={"center"} alignItems={"center"} spacing={2} className="w-full">
                  <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank">
                    <p className="underline text-blue-700 font-bold text-md">View transaction on EtherScan</p>
                  </a>
                  <Button
                    onClick={() => {

                    }}
                    className="bg-[#FFC700] hover:bg-[#ebc745] text-[#000000] px-4 py-2 rounded-[30px]" >
                    Go to Dashboard
                  </Button>
                  <Button
                    onClick={() => {
                      setOpenLoading(false)
                    }}
                    color="error" variant="text" >
                    Close
                  </Button>
                </Stack>
              ) : (
                <>
                  <CircularProgress
                    color="warning"
                    size={50}
                  />
                </>
              )
            }

          </Stack>
        </Box>
      </Dialog>
    </>
  );
};


const calculateTimeDifference = (arrival, departure) => {
  const arrivalTime = new Date(arrival);
  const departureTime = new Date(departure);

  // Calculate the difference in milliseconds
  const timeDifference = arrivalTime - departureTime;

  // Convert milliseconds to hours and minutes
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  // Format the result
  const formattedTimeDifference = `${hours}h ${minutes.toString().padStart(2, '0')}m`;

  return formattedTimeDifference;
};

export default Search;
