import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CardComponent.css'; // Assuming you save the CSS in a separate file
import { FaMobileScreenButton } from "react-icons/fa6";
import { BsTelephoneForward } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { FaGlobe, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { GET_CARD } from '../constants/utils';

const CardComponent = () => {
    const styles = {
        infoItem: {
            display: 'flex',
            paddingBottom: "30px",
            alignItems: 'center'
        },
        emailText: {
            wordBreak: 'break-all',
        }
    };
    const [cardData, setcardData] = useState([]);
    const { id } = useParams();

    const fetchDetails = async () => {
        try {
            const response = await fetch(`${GET_CARD}/${id}`, {
                method: 'GET',
            });
            const data = await response.json();
            setcardData(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    const generateVCard = () => {
        const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:${cardData.firstName} ${cardData.lastName}
ORG:${cardData.companyName}
TITLE:${cardData.profession}
TEL;TYPE=CELL:${cardData.mobileNumber}
TEL;TYPE=WORK:${cardData.alternateNumber}
EMAIL;TYPE=INTERNET:${cardData.email}
ADR;TYPE=WORK:;;${cardData.street};${cardData.state};;${cardData.pincode};${cardData.country}
URL:${cardData.linkedInUrl}
END:VCARD
        `;
        return vCardData.trim();
    };

    const downloadVCard = () => {
        const vCardData = generateVCard();
        const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${cardData.firstName}_${cardData.lastName}.vcf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div style={{ justifyContent: "center" }} className="container ">
            <div className="card-group mt-5">
                <div className="card card1">
                    <div className="header" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src="/images/STIE.png" alt="Logo" style={{ width: '60px', height: '20px' }} />
                        <span className="vertical-line l1" style={{ margin: '0 10px' }}></span>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ color: 'red', fontWeight: 'bolder', fontSize: '14px' }}>{cardData.companyName}</span>
                            <span style={{ fontSize: '7px' }}>ASIAN REACH, INNOVATIVE DELIVERY</span>
                        </div>
                    </div>

                    <div className="bg1" style={{ paddingTop: "13px", height: "250px", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div style={{ textAlign: "center" }}>
                            <div className='flex-row'>
                                <h4>{cardData.firstName + " "}{cardData.lastName} </h4>
                            </div>
                            <h6 style={{ fontSize: "15px" }}>{cardData.profession}</h6>
                            <h6 style={{ fontSize: "15px" }}>{cardData.profile}</h6>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                            <a className="social-media-img-container anchor" style={{ padding: '5px 3.5px', flex: '0 0 25%' }} href={`//wa.me/${cardData.mobileNumber}`} target="_blank" rel="noopener noreferrer">
                                <FaWhatsapp size="30px" />
                            </a>
                            <a className="social-media-img-container anchor" style={{ padding: '5px 3.5px', flex: '0 0 25%' }} href={`https://www.linkedin.com/in/${cardData.linkedInUrl}`} target="_blank" rel="noopener noreferrer">
                                <FaLinkedin size="30px" />
                            </a>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', height: '100%' }}>
                            <form className="social-media-img-container" style={{ display: 'inline-block', marginBlockEnd: 0, marginTop: 0 }} method="post">
                                <button
                                    className='btnsave'
                                    onClick={downloadVCard}
                                    type="button"
                                    style={{
                                        border: '2px solid #414042',
                                        width: '150px',
                                        borderRadius: '4px',
                                        backgroundColor: '#f0f0f0', // Background color
                                        fontWeight: 'bold',
                                        color: '#414042',
                                        marginRight: '40px',
                                        marginBottom: "20px"
                                    }}
                                >
                                    Save Contact
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="list mt-2">
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {['Advancer IFM Services', 'Cleaning & Stewarding', 'Pest Control & Fumigation', 'Landscape & Gardening', 'Security & Technology'].map((company) => (
                                <li
                                    key={company}
                                    className={`list-item ${cardData.companyName === company ? 'selected' : ''}`}
                                    style={{ display: 'inline-block', margin: '0 5px' }}
                                >
                                    <a href="#" className="anchor">{company}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="card flex">
                    <div style={{ backgroundColor: "white" }}>
                        <img className='imgg' src={`data:image/jpg;base64,${cardData.photo}`} alt="Logo" style={{ width: '270px', height: '200px' }} />
                    </div>
                    <div style={{ padding: "20px", paddingBottom: "25px" }} className="bg2 flex-column card2">
                        <div className="info-item mt-2" style={{ display: 'flex', alignItems: 'center', paddingBottom: "20px" }}>
                            <FaMobileScreenButton color='white' size="20px" />
                            <p className='text-white' style={{ marginLeft: '10px' }}>{cardData.mobileNumber}</p>
                        </div>
                        <div className="info-item mt-2" style={{ display: 'flex', alignItems: 'center', paddingBottom: "20px" }}>
                            <BsTelephoneForward color='white' size="20px" />
                            <p className='text-white' style={{ marginLeft: '10px' }}>{cardData.alternateNumber}</p>
                        </div>
                        <div className="info-item email-info mt-2" style={styles.infoItem} >
                            <MdEmail color='white' size="20px" />
                            <p className='text-white' style={styles.emailText}>{cardData.email}</p>
                        </div>
                        <div className="info-item mt-2" style={{ display: 'flex', paddingBottom: "20px" }}>
                            <IoLocation color='white' size="20px" />
                            <div>
                                <p style={{ fontSize: '15px' }} className='text-white'>{cardData.street}</p>
                                <p className='text-white'>{cardData.state}</p>
                                <p className='text-white'>{cardData.country},{cardData.pincode}</p>
                            </div>
                        </div>
                        <div className="info-item mt-2" style={{ display: 'flex' }}>
                            <FaGlobe color='white' size="20px" />
                            <p className='text-white text-xs' style={{ fontSize: '15px' }}>{cardData.companyName}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardComponent;
