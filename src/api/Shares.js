import React, {useEffect, useState} from 'react';
import NotesService from '../service/NotesService';
import Space from '../element/Space';
import Moment from 'react-moment';
import {PropagateLoader} from 'react-spinners';
import {isUserLoggedIn} from '../service/LoginService';
import {navbarToken} from '../service/NavbarService';
import {useNavigate} from 'react-router';

function Shares() {
    const [share1, setShare1] = useState([]);
    const [share2, setShare2] = useState([]);
    const [share3, setShare3] = useState([]);
    const [open1, setOpen1] = useState([]);
    const [open2, setOpen2] = useState([]);
    const [open3, setOpen3] = useState([]);
    const [close1, setClose1] = useState([]);
    const [close2, setClose2] = useState([]);
    const [close3, setClose3] = useState([]);
    const [change1, setChange1] = useState(0);
    const [change2, setChange2] = useState(0);
    const [change3, setChange3] = useState(0);
    const [volume1, setVolume1] = useState(0);
    const [volume2, setVolume2] = useState(0);
    const [volume3, setVolume3] = useState(0);
    const open = useState(0);
    const [close, setClose] = useState(0);
    const change = useState(0);
    const [changeColor1, setChangeColor1] = useState(true);
    const [changeColor2, setChangeColor2] = useState(true);
    const [changeColor3, setChangeColor3] = useState(true);
    const [changeColorStatus1, setChangeColorStatus1] = useState(true);
    const [changeColorStatus2, setChangeColorStatus2] = useState(true);
    const [changeColorStatus3, setChangeColorStatus3] = useState(true);
    const [loading, setLoading] = useState(true);
    const [showReturnButton, setShowReturnButton] = useState(false);
    const [currentDate, setCurrentDate] = useState();
    //const currentDate = Date.now().valueOf();
    const isAuth = isUserLoggedIn();
    const navigate = useNavigate();
    const wait = (n) => new Promise((resolve) => setTimeout(resolve, n));
    const list = useState([]);
    const [closeResponse, setCloseResponse] = useState([]);
    const [response, setResponse] = useState([]);
    const [status, getStatus] = useState();

    function returnButton() {
        navbarToken(true);
        navigate(-2);
    }

    async function showButton() {
        await wait(3000);
        setShowReturnButton(true);
    }

    function getChange(open, close) {
        const change = (close - open) / open * 100;
        return change;
    }

    function checkColor(change) {
        if (change > 0) {
            return true;
        } else
            return false;
    }

    function checkStatus(status) {
        if (status === "OK") {
            return true;
        } else
            return false;
    }

    function getCurrentDate(date) {
        const currentDate = date;
            return currentDate;
    }

    async function getData1() {
        NotesService.getShare1()
            .then(async response => {
                console.log('Printing response!', response.data);

                const list = response.data;
                console.log('Printing list!', list);
                setShare1(list);
                const currentDate = share1.from;
                const closeResponse = share1.close;
                const openResponse = share1.open;
                //console.log('Close is ' + closeResponse + '!');
                //console.log('Open is ' + openResponse + '!');

                getCurrentDate(currentDate);
                setCurrentDate(currentDate);

                const change = getChange(openResponse, closeResponse);
                const status = share1.status;
                setChange1(change);
                setChangeColor1(checkColor(change));
                setChangeColorStatus1(checkStatus(status));
                setLoading(false);
                await showButton();
            })
            .catch(error => {
                console.log('An error occurred!', error);
            })
    }

    function getData2() {
        NotesService.getShare2()
            .then(async response => {
                console.log('Printing response!', response.data);

                const list = response.data;
                console.log('Printing list!', list);
                setShare2(list);
                const closeResponse = share2.close;
                const openResponse = share2.open;
                //console.log('Close is ' + closeResponse + '!');
                //console.log('Open is ' + openResponse + '!');

                const change = getChange(openResponse, closeResponse);
                const status = share2.status;
                setChange2(change);
                setChangeColor2(checkColor(change));
                setChangeColorStatus2(checkStatus(status));
                setLoading(false);
                await showButton();
            })
            .catch(error => {
                console.log('An error occurred!', error);
            })
    }

    function getData3() {
        NotesService.getShare3()
            .then(async response => {
                console.log('Printing response!', response.data);

                const list = response.data;
                console.log('Printing list!', list);
                setShare3(list);
                const closeResponse = share3.close;
                const openResponse = share3.open;
                //console.log('Close is ' + closeResponse + '!');
                //console.log('Open is ' + openResponse + '!');

                const change = getChange(openResponse, closeResponse);
                const status = share3.status;
                setChange3(change);
                setChangeColor3(checkColor(change));
                setChangeColorStatus3(checkStatus(status));
                setLoading(false);
                await showButton();
            })
            .catch(error => {
                console.log('An error occurred!', error);
            })
    }

    useEffect(() => {
        getData1();
        getData2();
        getData3();
    }, []);

    return (
        <div className="main-content">
            {
            loading ? (
                <div>
                    {!isAuth &&
                        <div className="loader-container" style={{marginTop: 137}}>
                            <div className="text-center">
                                <PropagateLoader color={'#79589f'} size={20}/>
                                <Space/>
                            </div>
                        </div>
                    }
                    {isAuth &&
                        <div className="loader-container" style={{marginTop: 77}}>
                            <div className="text-center">
                                <PropagateLoader color={'#79589f'} size={20}/>
                                <Space/>
                            </div>
                        </div>
                    }
                </div>
            ) : (
            <div className="main-content">
                <h4>Stock Shares</h4>
                <Space/>
                <x-h8>
                    <div className="row mb-2 ml-auto">
                        NASDAQ Stock Market:
                    </div>
                </x-h8>
                <div className="row mb-4 ml-auto">
                    <div className="column left">
                        Close: {JSON.stringify(share1.close)}
                        <div>
                            Open: {JSON.stringify(share1.open)}
                        </div>
                        <div>
                            High: {JSON.stringify(share1.high)}
                        </div>
                        <div>
                            Low: {JSON.stringify(share1.low)}
                        </div>
                        <div>
                            Status:
                            {changeColorStatus1 &&
                                <i className="ml-1" style={{color: "green"}}>{share1.status}</i>
                            }
                            {!changeColorStatus1 &&
                                <i className="ml-1" style={{color: "red"}}>{share1.status}</i>
                            }
                        </div>
                    </div>
                    <div className="column right">
                        {changeColor1 &&
                            <i className="ml-5" style={{color: "green"}}>{change1.toFixed(2)}</i>
                        }
                        {!changeColor1 &&
                            <i className="ml-5" style={{color: "red"}}>{change1.toFixed(2)}</i>
                        } %
                    </div>
                </div>
                <x-h8>
                    <div className="row mb-2 ml-auto">
                        Goldman Physical Gold ETF:
                    </div>
                </x-h8>
                <div className="row mb-4 ml-auto">
                    <div className="column left">
                        Close: {JSON.stringify(share2.close)}
                        <div>
                            Open: {JSON.stringify(share2.open)}
                        </div>
                        <div>
                            High: {JSON.stringify(share2.high)}
                        </div>
                        <div>
                            Low: {JSON.stringify(share2.low)}
                        </div>
                        <div>
                            Status:
                            {changeColorStatus2 &&
                                <i className="ml-1" style={{color: "green"}}>{share2.status}</i>
                            }
                            {!changeColorStatus2 &&
                                <i className="ml-1" style={{color: "red"}}>{share2.status}</i>
                            }
                        </div>
                    </div>
                    <div className="column right">
                        {changeColor2 &&
                            <i className="ml-5" style={{color: "green"}}>{change2.toFixed(2)}</i>
                        }
                        {!changeColor2 &&
                            <i className="ml-5" style={{color: "red"}}>{change2.toFixed(2)}</i>
                        } %
                    </div>
                </div>
                <x-h8>
                    <div className="row mb-2 ml-auto">
                        NVIDIA Corporation:
                    </div>
                </x-h8>
                <div className="row mb-4 ml-auto">
                <div className="column left">
                    Close: {JSON.stringify(share3.close)}
                    <div>
                        Open: {JSON.stringify(share3.open)}
                    </div>
                    <div>
                        High: {JSON.stringify(share3.high)}
                    </div>
                    <div>
                        Low: {JSON.stringify(share3.low)}
                    </div>
                    <div>
                        Status:
                        {changeColorStatus3 &&
                            <i className="ml-1" style={{color: "green"}}>{share3.status}</i>
                        }
                        {!changeColorStatus3 &&
                            <i className="ml-1" style={{color: "red"}}>{share3.status}</i>
                        }
                    </div>
                </div>
                <div className="column right">
                    {changeColor3 &&
                        <i className="ml-5" style={{color: "green"}}>{change3.toFixed(2)}</i>
                    }
                    {!changeColor3 &&
                        <i className="ml-5" style={{color: "red"}}>{change3.toFixed(2)}</i>
                    } %
                </div>
                </div>
                <x-h8>Date:</x-h8>
                <div className="mb-3">
                    <Moment format="DD/MM/YYYY">{currentDate}</Moment>
                </div>
            </div>
            )}
            {
                showReturnButton &&
                <button
                    title='Back to previous page'
                    style={{background: "white"}} onClick={returnButton}>
                    <i className="fa-solid fa-arrow-turn-down fa-rotate-90 fa-lg" style={{color: "#79589f"}}/>
                </button>
            }
        </div>
    );
}
export default Shares;